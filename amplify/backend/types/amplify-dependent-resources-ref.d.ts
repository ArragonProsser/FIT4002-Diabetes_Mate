export type AmplifyDependentResourcesAttributes = {
  "api": {
    "Diabetesmate": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    }
  },
  "auth": {
    "diabetesmate": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "CreatedSNSRole": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "appointmentsLambda": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "diabetesmateauthorisers": {
      "Arn": "string"
    },
    "diabetesmatecontrollers": {
      "Arn": "string"
    },
    "diabetesmatequeries": {
      "Arn": "string"
    },
    "diabetesmateservices": {
      "Arn": "string"
    },
    "diabetesmatevalidators": {
      "Arn": "string"
    },
    "usersLambda": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  }
}