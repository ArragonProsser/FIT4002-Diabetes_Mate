# Diabetes Mate

This application was built as part of a university project to address the challenges of patient engagement and communication within limited consultation time. It provides users with a convenient and user friendly platform to manage their health appointments, track their biomarkers and prompts them to ask the right questions in their consultations. The app offers doctors valuable insights into their patients health status enabling them to run consultations more effectively.

![](/Onboarding.png)
![](/Biomarkers-Graph.png)

![](/Appointment-Questions.png)

![](/Appointment-Record-Data.png)
![](/Education-Resources.png)

![](/System-Architecture.png)

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
