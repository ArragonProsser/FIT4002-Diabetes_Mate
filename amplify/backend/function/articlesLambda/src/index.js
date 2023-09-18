const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

const { APIGatewayProxyHandler } = require('@types/aws-lambda');

const server = awsServerlessExpress.createServer(app);

/**
 * @type {APIGatewayProxyHandler}
 */
exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
