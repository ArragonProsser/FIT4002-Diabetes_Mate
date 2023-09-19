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
const controller = process.env.NODE_ENV === "test" ? require('../../diabetesmatecontrollers/opt/appointments.controller') : require('/opt/appointments.controller.js');
const authoriser = process.env.NODE_ENV === "test" ? require('../../diabetesmateauthorisers/opt/main.authorisers') : require('/opt/main.authorisers.js');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
    /*
    Lambda that handles all appointment related queries.
    @param { Object } event - The event object containing information about the event.
    @param { Object } context - The execution context of the Lambda function.
    @param { function} callback - The callback function used to return a response.
    @returns { Promise } A promise that resolves to the result of the Lambda function.
    */
    const auth = await authoriser.authoriseRequest(event.headers.Authorization);
    console.log("HERE");
    console.log(auth);
    if (!auth) {
        return {
            statusCode: 401,
            body: "You are not authorized to access this!"
        }
    }
    const authUserId = auth.sub;
    console.log("CONTROLLER")
    console.log(controller);
    switch (event?.['pathParameters']?.['action']?.toLowerCase()) {
        case 'get':
            return await controller.getAppointmentsForUser(authUserId);
        case 'create':
            return await controller.createAppointment(authUserId);
        case 'update':
            if (event.httpMethod == 'PUT') {
                return {
                    "statusCode": 200,
                    "body": JSON.stringify(await controller.updateAppointment(JSON.parse(event.body), authUserId))
                }
            }
            return {
                "statusCode": 405,
                "body": JSON.stringify({ error: "Method Not Allowed" })
            }
        case 'test-auth':
            try {
                return {
                    body:
                        JSON.stringify({
                            "authoriser": authUserId
                        })
                };
            } catch (e) {
                return { body: JSON.stringify(e) };
            }
        default:
            return JSON.stringify({ error: 'Invalid Path!' });
    }
}
