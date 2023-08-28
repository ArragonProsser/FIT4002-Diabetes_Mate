const { app, server } = require('./app'); // Replace with the correct file path
const request = require('supertest');

const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

// Mocking the dynamodb calls.
jest.mock('@aws-sdk/lib-dynamodb', () => {
    const originalModule = jest.requireActual('@aws-sdk/lib-dynamodb');
    return {
        ...originalModule,
        DynamoDBDocumentClient: {
            from: () => {
                return {
                    send: jest.fn().mockResolvedValue({
                        status: 200, statusCode: 200, body: {}
                    })
                }
            }
        }
    };
});

describe('GET Lambda Function', () => {

    afterAll((done) => {
        server.close(done);
    });

    it('should respond with a single item', async () => {

        const response = await request(app)
            .get('/articles/test') // Replace with actual user ID
            .set('x-apigateway-event', JSON.stringify({})) // Mock the API Gateway event
            .set('x-apigateway-context', JSON.stringify({})) // Mock the API Gateway context
            .set('Content-Type', 'application/json')
        // console.log(response);

        expect(response.statusCode).toBe(200);
    });

    // Add more test cases as needed
});
