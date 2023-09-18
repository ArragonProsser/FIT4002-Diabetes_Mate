
# diabetes_mate

## How to run

### Install dependencies

```

npm install

```

### Run with Expo

Ensure you have npx install and run the following:

```

npx expo start

```

Ensure that you have an emulator linked to expo in order to run locally. Alternately you can use the QR code that Expo provides us to run the app on an iOS/Android device.

## Generating JSDoc

### Install JSDoc

```

npm install -g jsdoc

```

### Generate JSDoc

```

jsdoc -c ./conf.json -r

```

## Amplify Deployment

### Install Amplify CLI

```

npm install -g @aws-amplify/cli

```

### Credential Configuration

Will need to ask @Akila Parawithana for local Amplify CLI credentials to deploy and make changes to backend lambdas and cloud infrastucture of personal account.

### Deploy Amplify Changes

```

amplify push

```

Note that the FIT4002 student development team do not have time to migrate the serverless backend away from Amplify and in the case it needs to be done to adhere to cloud security requirements, you may need to completely refactor and reprovision the backend code and associated cloud infrastructure. Please consult @Susanne Baker or @Ravindu Landekumbura for more information.
