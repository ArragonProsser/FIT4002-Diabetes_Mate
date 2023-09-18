const queries = process.env.NODE_ENV === "test" ? require('../../diabetesmatequeries/opt/appointments.queries') : require('/opt/appointments.queries.js');
const { validateBiomarker } = process.env.NODE_ENV === "test" ? require('../../diabetesmatevalidators/opt/appointments.validators') : require('/opt/appointments.validators.js');


module.exports = {
    /**
     * Controller Method to retrieve appointments for user
     * @param {string} authUserId User authentication Id.
     * @returns {Array|Object} Array of appointments for the given user, Error Object if fail
     */
    async getAppointmentsForUser(authUserId) {
        return await queries.getAppointmentsForUser(authUserId);
    },
    /**
     * Controller Method to update appointment a specific appointment document for a given user Id.
     * @param {Object} appointment Appointment document to be updated
     * @param {string} authUserId User authentication Id.
     * @returns {Object} Updated Appointment Return Object, Error object if fail
     */
    async updateAppointment(appointment, authUserId) {
        // Validate Appointment Fields

        let validationErrorArray = validateBiomarker(appointment['biomarker']['data'])
        if (validationErrorArray.length == 0) {
            return await queries.updateAppointmentForUser(appointment, authUserId);
        } else {
            return {
                "message": "ValidationError",
                "errors": validationErrorArray
            }
        }
    }
};
