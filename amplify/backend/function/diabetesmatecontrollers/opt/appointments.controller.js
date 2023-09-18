const queries = process.env.NODE_ENV === "test" ? require('../../diabetesmatequeries/opt/appointments.queries') : require('/opt/appointments.queries.js');
const { validateBiomarker } = process.env.NODE_ENV === "test" ? require('../../diabetesmatevalidators/opt/appointments.validators') : require('/opt/appointments.validators.js');


module.exports = {
    async getAppointmentsForUser(authUserId) {
        return await queries.getAppointmentsForUser(authUserId);
    },
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
