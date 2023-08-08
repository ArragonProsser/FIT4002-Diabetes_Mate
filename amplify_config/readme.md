# AWS Okta Authenticator

This python script is designed to enable authentication to AWS, via Okta, for access via SAML. The script is designed to make it easy for you to authenticate against multiple environments at a time, and sets up multiple AWS profiles so that you can more easily switch between accounts.

More information can be found on Confluence: https://confluence.apps.monash.edu/display/AWS/AWS+CLI+Authentication+via+Okta

## Requirements

This script requires Python 3, and probably pip (to install the additional modules).

## Running the Script

*Note:* The instructions on the [Confluence](https://confluence.apps.monash.edu/display/AWS/AWS+CLI+Authentication+via+Okta) page are better.

You can run the script as follows:
`python3 ./okta-auth.py` - show the help

`python3 ./okta-auth.py` (make sure you're in the same directory as the script)

The script will prompt you to provide your Monash email address and your password. By default, the script will authenticate you to the `corp-poc-readonly` role, and will use _Push_ as your MFA method. To authenticate to a different role, you can specify the role using a command line switch:

`python3 ./okta-auth.py -r "corp-prd-readonly"`

You can also provide wildcards for the role to authenticate against multiple accounts at the same time:

`python3 ./okta-auth.py -r "corp-*-readonly"`

If you want to provide your email address via the command line, you can do that too:

`python3 ./okta-auth.py -r "corp-*-readonly" -e "mgr-jlam0002@monash.edu"`

You can also change your MFA method (`-m`), and enable more verbose output (`-v`). For a full list of options, use  `-h`.

To list all the roles available to your user account:

`python3 ./okta-auth.py -l`