/* Amplify Params - DO NOT EDIT
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
Amplify Params - DO NOT EDIT */const controller = require('/opt/users.controller.js');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "*/*"
        },
        "body": JSON.stringify({
            msg: "Reached",
        })
    }
    // switch (event?.['pathParameters']?.['action']?.toLowerCase()) {
    //     case 'post':
    //         return { "msg": "Reached" };
    //     // return await controller.postUser(JSON.parse(event.body));
    //     // case 'put':
    //     //     return await controller.putBiomarkersForUser(JSON.parse(event.body));
    //     default:
    //         return { error: 'Invalid Path!' };
    // }
}
