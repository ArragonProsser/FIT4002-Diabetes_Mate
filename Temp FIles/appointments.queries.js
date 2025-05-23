const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const TableName = "Appointment-dev";

module.exports = {
  docClient,
  /**
   * Query to retrieve appointments for a given user Id.
   * @param {string} authUserId User authentication Id.
   * @returns {Array|Object} Array of appointments for the given user, Error Object if fail
   */
  async getAppointmentsForUser(authUserId) {
    try {
      const params = {
        TableName,
        IndexName: "patient_id-index",
        KeyConditionExpression: "patient_id = :authUserId",
        ExpressionAttributeValues: {
          ":authUserId": authUserId,
        },
      };
      const data = await docClient.query(params).promise();
      return { body: JSON.stringify(data) };
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  },
  /**
   * Delete appointments for a given user Id.
   * @param {string} authUserId User authentication Id.
   * @returns {Array|Object} Array of appointments for the given user, Error Object if fail
   */
  async deleteAppointmentsForUser(appointment, authUserId) {
    console.log("Delete Appointments For User Queries.js");
    try {
      if (appointment.patient_id !== authUserId) {
        throw new Error(
          "You do not have permission to update the appointment!"
        );
      }
      const params = {
        TableName,
        IndexName: "patient_id-index",
        KeyConditionExpression: "patient_id = :authUserId",
        ExpressionAttributeValues: {
          ":authUserId": authUserId,
        },
      };
      await docClient.delete(params).promise();
      //   return { body: JSON.stringify(data) };
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  },
  /**
   * Query to create appointment document for a given user Id.
   * @param {Object} appointment Appointment document to be created
   * @param {string} authUserId User authentication Id.
   * @returns {Object} Result Return Object, Error object if fail
   */
  async createAppointmentForUser(appointment, authUserId) {
    try {
      if (appointment.patient_id !== authUserId) {
        throw new Error(
          "You do not have permission to update the appointment!"
        );
      }
      const result = await docClient
        .put({
          TableName: TableName,
          Item: appointment,
        })
        .promise();
      return result;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  },
  /**
   * Query to update appointment a specific appointment document for a given user Id.
   * @param {Object} appointment Appointment document to be updated
   * @param {string} authUserId User authentication Id.
   * @returns {Object} Result Return Object, Error object if fail
   */
  async updateAppointmentForUser(appointment, authUserId) {
    try {
      if (appointment.patient_id !== authUserId) {
        throw new Error(
          "You do not have permission to update the appointment!"
        );
      }
      var params = {
        TableName: TableName,
        Key: {
          appointment_id: appointment["appointment_id"],
        },
        UpdateExpression: `set biomarker = :biomarker, questions = :questions, reminders = :reminders, notes = :notes`,
        ExpressionAttributeValues: {
          ":biomarker": appointment["biomarker"],
          ":questions": appointment["questions"],
          ":reminders": appointment["reminders"],
          ":notes": appointment["notes"],
        },
      };
      await docClient.update(params).promise();
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  },
};
