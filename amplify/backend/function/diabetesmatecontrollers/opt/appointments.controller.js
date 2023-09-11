const queries = process.env.NODE_ENV === "test" ? require('../../diabetesmatequeries/opt/appointments.queries') : require('/opt/appointments.queries.js');
const { validateBiomarker } = process.env.NODE_ENV === "test" ? require('../../diabetesmatevalidators/opt/appointments.validators') : require('/opt/appointments.validators.js');


module.exports = {
    async getAppointmentsForUser() {
        return await queries.getAppointmentsForUser();
    },
    async updateAppointmentBiomarker(appointment) {
        // Validate Appointment Fields

        let validationErrorArray = validateBiomarker(appointment['biomarker']['data'])
        if (validationErrorArray.length == 0) {
            return await queries.updateAppointmentForUser(appointment);
        } else {
            return {
                "message": "ValidationError",
                "errors": validationErrorArray
            }
        }
    }
};
