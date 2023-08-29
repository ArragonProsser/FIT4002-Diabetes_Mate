const controller = require('/opt/users.controller.js');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event, context) => {
    switch (event?.['pathParameters']?.['action']?.toLowerCase()) {
        case 'post':
            return { "msg": "Reached" };
        // return await controller.postUser(JSON.parse(event.body));
        // case 'put':
        //     return await controller.putBiomarkersForUser(JSON.parse(event.body));
        default:
            return { error: 'Invalid Path!' };
    }
};
