const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const TableName = 'User-dev';

module.exports = {
    async postUser(user) {
        try {
            const result = await docClient.put({
                TableName: TableName,
                Item: {
                    id: user['id'],
                    username: user['username'],
                    email: user['email'],
                    phone_number: user['phone_number'],
                    biomarkers: []
                }
            }).promise()
            return result;
        } catch (err) {
            return { error: err }
        }
    },
    async putBiomarkersForUser(user) {
        try {
            const result = await docClient.update({ TableName: TableName, Item: user }).promise()
            return result;
        } catch (err) {
            return { error: err }
        }
    }
};