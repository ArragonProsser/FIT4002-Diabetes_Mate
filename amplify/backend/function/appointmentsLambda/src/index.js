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
Amplify Params - DO NOT EDIT */
const controller = require('/opt/appointments.controller.js');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
    switch(event ?. ['pathParameters'] ?. ['action'] ?. toLowerCase()){
        case 'get':
            return await controller.getAppointmentsForUser();
        default:
            return {error: 'Invalid Path!'};
    }
}
