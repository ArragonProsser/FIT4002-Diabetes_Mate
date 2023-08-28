const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const TableName = 'Appointment-dev';

module.exports = {
    async getAppointmentsForUser(){
        try {
            const data = await docClient.scan({TableName}).promise()
            return { body: JSON.stringify(data) }
        } catch (err) {
            return { error: err }
        }
    }
};