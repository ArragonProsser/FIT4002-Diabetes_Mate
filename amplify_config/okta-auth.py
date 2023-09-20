#!/usr/bin/env python3

# Librararies included with Python
import argparse, base64, configparser, fnmatch, getpass, json, logging, os, sys, time, warnings
import urllib.parse
import xml.etree.ElementTree as ET
from pathlib import Path

# Libraries to be installed (via pip)
import arrow, boto3, requests
from lxml import html
from botocore.exceptions import ClientError

okta_endpoint = "https://monashuni.okta.com"
default_search_pattern = "corp-poc-readonly"

# Cache the Okta token, tokens seem to last 5 minutes
if os.name == 'posix':
    token_state_file = '/tmp/.okta_session'
elif os.name == 'nt':
    token_state_file = '{}/.okta_session'.format(
        os.path.expandvars('%TEMP%')
    )

def primary_auth(username, password):

    searchpattern = "corp-dev-administrator"

    auth_obj = {
        "username" : username,
        "password" : password,
        "options" : {
            "multiOptionalFactorEnroll": False,
            "warnBeforePasswordExpired": False
        }
    }

    return post_obj("/api/v1/authn", auth_obj)

def do_mfa(response, factor = "push"):

    logger.info("Attempting MFA with method: %s" % factor)

    if factor == "totp":
        factor = "token:software:totp"

    if "stateToken" not in response:
        raise Exception("No state token in response, can't auth.")

    if "_embedded" not in response or "factors" not in response["_embedded"]:
        raise Exception("No MFA factors found.")

    factor_actions = {
        "token:software:totp": do_totp,
        "push": do_push
    }

    if factor not in factor_actions:
        raise Exception("Unsupported factor type: %s" % factor)

    for f in response["_embedded"]["factors"]:
        if f["factorType"] == factor:
            return factor_actions[factor](response["stateToken"], f["id"])

    raise Exception("Provided factor %s is not available" % factor)

def do_totp(state_token, factor_id):

    logger.debug("Attempting MFA with method TOTP; state token: %s" % state_token)

    totp = input("One-Time Password: ")
    logger.debug("Sending TOTP to server; state token: %s" % state_token)

    endpoint = "/api/v1/authn/factors/%s/verify" % factor_id
    data = { "stateToken" : state_token, "passCode" : totp}

    return post_obj(endpoint, data)

def do_push(state_token, factor_id):

    logger.debug("Attempting MFA with Push; state token: %s" % state_token)

    endpoint = "/api/v1/authn/factors/%s/verify" % factor_id
    data = { "stateToken" : state_token }

    print("Performing authentication via Push - get your mobile device ready!")

    r = post_obj(endpoint, data)
    attempt = 0

    while r["status"] == "MFA_CHALLENGE" and r["factorResult"] == "WAITING" and attempt < 30:

        # Check if JSON response contains 'correctAnswer' property in the 'challenge' object

        try:
           if "correctAnswer" in r["_embedded"]["factor"]["_embedded"]["challenge"]:
               print("Your MFA 3 Number Challenge Answer is:",r["_embedded"]["factor"]["_embedded"]["challenge"]["correctAnswer"])

        except KeyError:
           pass

        # Increment attempt counter
        attempt += 1

        time.sleep(1)
        logger.debug("Try getting challenge response: %s (attempt %s)" % (state_token, attempt))
        r = post_obj(endpoint, data)

    if r["status"] == "MFA_CHALLENGE" and r["factorResult"] == "WAITING":
        raise Exception("Push action timed out.")

    return r

def get_saml_assertion(session_token):

    logger.info("Getting SAML assertion from Okta redirect page.")

    url = urllib.parse.urljoin(okta_endpoint, "app/amazon_aws/exk1ghtv9cUjd3bq72p7/sso/saml?sessionToken=%s" % session_token)
    r = requests.get(url)

    if r.status_code == 200:

        tree = html.fromstring(r.text)
        form = tree.xpath("//form[@id='appForm']")[0]
        assertion = form.xpath("./input[@name='SAMLResponse']")[0]

        return assertion.get("value")

    raise Exception("Could not get SAML assertion from redirect page.")

def get_aws_roles(assertion):

    logger.info("Getting AWS roles from SAML assertion.")

    awsroles = []
    root = ET.fromstring(base64.b64decode(assertion))

    for saml2attribute in root.iter('{urn:oasis:names:tc:SAML:2.0:assertion}Attribute'):

        if (saml2attribute.get('Name') == 'https://aws.amazon.com/SAML/Attributes/Role'):
            for saml2attributevalue in saml2attribute.iter('{urn:oasis:names:tc:SAML:2.0:assertion}AttributeValue'):
                (principal_arn,role_arn) = saml2attributevalue.text.split(",")
                awsroles.append({"principal_arn" : principal_arn, "role_arn" : role_arn})

    logger.debug("Got roles: %s" % awsroles)

    return awsroles

def find_roles(roles, search_pattern):

    logger.info("Searching roles with pattern: %s" % search_pattern)

    matched_roles = []

    for role in roles:

        role_name = role["role_arn"].split("/")[-1]

        if fnmatch.fnmatch(role_name, search_pattern):
            matched_roles.append(role)

    logger.debug("Found roles: %s" % matched_roles)

    return matched_roles

def get_session_duration_from_assertion(assertion, default = 3600):

    session_duration = default

    logger.debug("Getting session duration from SAML assertion.")

    root = ET.fromstring(base64.b64decode(assertion))

    for saml2attribute in root.iter('{urn:oasis:names:tc:SAML:2.0:assertion}Attribute'):

        if (saml2attribute.get('Name') == 'https://aws.amazon.com/SAML/Attributes/SessionDuration'):

            logger.debug("Found session duration attribute within assertion. Exctracting.")
            for saml2attributevalue in saml2attribute.iter('{urn:oasis:names:tc:SAML:2.0:assertion}AttributeValue'):

                # Put this in a try/catch, so that if it fails it doesn't break the script
                try:
                    session_duration = int(saml2attributevalue.text)
                except:

                    logger.error("Could not convert %s to integer." % (saml2attributevalue.text))
                    # Stuff broke, use the default
                    session_duration = default

    logger.debug("Resolved session duration: %s" % session_duration)

    return session_duration

def auth_role(role, assertion, config_path = None):

    logger.info("Authenticating to role: %s" % role)

    #
    # Expand out the config file path so we have the absolute version
    #
    if config_path is None:
        config_path = "~/.aws/config"

    config_path = os.path.abspath(os.path.expanduser(config_path))
    logger.debug("Using config path: %s" % config_path)

    # create/touch config_path file if it does not exists
    if not os.path.isfile(config_path):
        Path(config_path).touch()

    session_duration = get_session_duration_from_assertion(assertion)

    #
    # Get a temporary set of credentials from AWS
    #
    logger.debug("Getting token from AWS")

    client = boto3.client('sts')

    try:

        token = client.assume_role_with_saml(
            RoleArn=role["role_arn"],
            PrincipalArn=role["principal_arn"],
            SAMLAssertion=assertion,
            DurationSeconds=session_duration
        )

    except ClientError as ce:

        logger.debug("Got a ClientError exception - see how we can handle it.")

        # Okta has a configurable session duration, which is passed as part of the SAML assertion, but AWS also
        # has this configured as part of each individual role. Since we are blindly using what's in the SAML
        # assertion, without knowing what's in the role, we have to have a fall-back option if our initial auth
        # request fails.
        if "The requested DurationSeconds exceeds the MaxSessionDuration set for this role." in ce.response["Error"]["Message"]:

            logger.debug("Mismatch between requested session duration and max allowed, defaulting to 1 hour.")

            token = client.assume_role_with_saml(
                RoleArn=role["role_arn"],
                PrincipalArn=role["principal_arn"],
                SAMLAssertion=assertion,
                DurationSeconds=3600
            )

        # If an account has been deleted, authentication to that role will fail.
        # Catch the exception, print a useful error to the user, but don't kill the scipt.
        elif "Access denied" in ce.response["Error"]["Message"]:
            logger.error("Error authenticating to role: %s; account deleted?" % role["role_arn"])
            return

        else:
            logger.debug("Unhandled ClientError: %s" % ce.response["Error"]["Message"])
            raise

    except Exception as e:
        logger.debug("Got a different exception. This one will be thrown.")
        raise

    #
    # Open the config file and add the token
    #
    logger.debug("Adding token to AWS config. AccessKeyId: %s" % token["Credentials"]["AccessKeyId"])

    config = configparser.RawConfigParser()
    config.read(config_path)

    role_name = role["role_arn"].split("/")[-1]
    section_name = "profile " + role_name

    logger.debug("Section name: %s" % section_name)

    if not config.has_section(section_name):
        logger.debug("Creating new section: %s" % section_name)
        config.add_section(section_name)

    config.set(section_name, 'output', 'json')
    config.set(section_name, 'region', 'ap-southeast-2')
    config.set(section_name, 'aws_access_key_id', token["Credentials"]["AccessKeyId"])
    config.set(section_name, 'aws_secret_access_key', token["Credentials"]["SecretAccessKey"])
    config.set(section_name, 'aws_session_token', token["Credentials"]["SessionToken"])

    #
    # Write the updated config file
    #
    logger.debug("Writing config to disk")

    with open(config_path, 'w+') as configfile:
        config.write(configfile)

    logger.debug("Token added to config succesfully")
    logger.info("Success!")

    print("Authenticated to {0}; call using aws <command> --profile {0}".format(role_name))

def post_obj(endpoint, data):

    global okta_endpoint

    url = urllib.parse.urljoin(okta_endpoint, endpoint)

    logger.debug("Executing request to %s" % url)

    r = requests.post(url, json = data)

    if r.status_code == 200:
        return r.json()
    else:
        raise Exception("Request to Okta failed with error: %s" % r.text)

##
## Step 0: Validate some possible inputs, and initialise the logger
##

parser = argparse.ArgumentParser(description=("Python script for authenticating with AWS accounts via Okta."))

parser.add_argument('-e', '--email', required = False, metavar = '', default = None,
    help=("Email address to log in as"))

parser.add_argument('-m', '--mfa', required = False, metavar = '', default = 'push',
    help=("MFA method to use (default push)"), choices={"push", "totp"})

parser.add_argument('-r', '--role-pattern', required = False, metavar = '', default = default_search_pattern,
    help=("Pattern to search for roles to authenticate against (Default: %s)" % default_search_pattern))

parser.add_argument('-c', '--config-path', required = False, metavar = '', default = None,
    help=("Path to AWS config file (default: ~/.aws/config)"))

parser.add_argument('-v', '--verbose', action='store_true', required = False, default = False,
    help=("Skip downloading of form response during backup."))

parser.add_argument('-l', '--listroles', action='store_true', required = False,
    help=('List the available roles only'))

arguments = parser.parse_args()

# print help and exit if no arguments provided
if len(sys.argv) == 1:
    parser.print_help()
    sys.exit()

# Create a logger object
logger = logging.getLogger('Okta Authenticator')
logger.setLevel(logging.ERROR)

# Create a console logger to output to
consoleLogger = logging.StreamHandler()
consoleLogger.setFormatter(logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s"))
logger.addHandler(consoleLogger)

# Make logging more verbose if requested
if(arguments.verbose):
    logger.setLevel(logging.DEBUG)
    consoleLogger.setLevel(logging.DEBUG)

logger.info("Starting Okta Authenticator with options: %s" % arguments)

def is_valid_username(username):

    if not username.endswith("@monash.edu"):
        logger.error("Username does not appear to be a monash email address")
        return False

    return True

##
## Step 1: Check for previous login sessiontoken
##

session_token = ''
assertion = ''
state_data = {}

if os.path.exists(token_state_file):
    with open(token_state_file) as token_file:
        token_dict = json.loads(token_file.read())
    if 'expiresAt' in token_dict.keys():
        expiry = arrow.get(token_dict['expiresAt'])

        if arrow.utcnow() > expiry:
            os.remove(token_state_file)
        else:
            session_token = token_dict['sessionToken']
            assertion = token_dict['assertion']

##
## Step 2: Get the user's credentials
##
if session_token == '':
    logger.info("Getting user's credentials")

    if arguments.email != None:
        logger.debug("User's email provided by command line")
        username = arguments.email
    else:
        logger.debug("Ask the user for their email address")
        username = input("Email address: ")

    logger.debug("Username: %s" % (username))

    if not is_valid_username(username):
        sys.exit(1)

    password = getpass.getpass('Password: ')

    now = arrow.utcnow()
    auth = primary_auth(username, password)

    password = "#############################################"
    del password

    if auth["status"] == "MFA_REQUIRED":
        auth = do_mfa(auth, arguments.mfa)

    if auth["status"] == "SUCCESS" and "sessionToken" in auth:
        session_token = auth["sessionToken"]
        state_data.update({
            'expiresAt': now.shift(seconds=280).format('YYYY-MM-DD HH:mm:ssZ'),
            'sessionToken': auth['sessionToken']
        })
    else:
        raise Exception("Could not get session token from response")

    assertion = get_saml_assertion(session_token)

    # write the token_file
    with open(token_state_file, 'w', encoding='utf-8') as token_file:
        state_data.update({'assertion': assertion})
        json.dump(state_data, token_file)

roles = get_aws_roles(assertion)
if arguments.listroles:
    print('Available roles:')
    for role in roles:
        print('\t{} ({})'.format(
            role['role_arn'].split('/')[1],
            role['role_arn'].split(':')[4]))
    print

else:
    auth_roles = find_roles(roles, arguments.role_pattern)

    for role in auth_roles:
        auth_role(role, assertion, arguments.config_path)
