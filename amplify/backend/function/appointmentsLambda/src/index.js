/* Amplify Params - DO NOT EDIT
	AUTH_DIABETESMATE_USERPOOLID
	ENV
	REGION
	STORAGE_APPOINTMENT_ARN
	STORAGE_APPOINTMENT_NAME
	STORAGE_APPOINTMENT_STREAMARN
	STORAGE_ARTICLE_ARN
	STORAGE_ARTICLE_NAME
	STORAGE_ARTICLE_STREAMARN
	STORAGE_USER_ARN
	STORAGE_USER_NAME
	STORAGE_USER_STREAMARN
Amplify Params - DO NOT EDIT */const fun = require('/opt/appointments.controller.js');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${
        JSON.stringify(event)
    }`);
    return {
        statusCode: 200,
        // Uncomment below to enable CORS requests
        // headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        // },
        body: JSON.stringify(fun() + event ?. ['pathParameters'] ?. ['action'])
    };
};
