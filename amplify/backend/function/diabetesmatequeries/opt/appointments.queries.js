const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const TableName = "Appointment-dev";

module.exports = {
  async getAppointmentsForUser() {
    try {
      const data = await docClient.scan({ TableName }).promise();
      return { body: JSON.stringify(data) };
    } catch (err) {
      return { error: err };
    }
  },
  async updateAppointmentForUser(appointment) {
    try {
      const result = await docClient
        .put({
          TableName: TableName,
          Item: appointment,
        })
        .promise();
      return result;
    } catch (err) {
      return { error: err };
    }
  },
  async getAppointmentForUser(user_id) {
    try {
      const data = await docClient
        .scan({
          TableName,
          FilterExpression: "patient_id = :id",
          ExpressionAttributeValues: { ":id": user_id },
        })
        .promise();
      return { body: JSON.stringify(data) };
    } catch (err) {
      return { error: err };
    }
  },
};
