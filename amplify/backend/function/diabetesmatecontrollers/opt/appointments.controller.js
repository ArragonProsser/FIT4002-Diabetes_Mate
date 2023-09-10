const queries = process.env.NODE_ENV === "test" ? require('../../diabetesmatequeries/opt/appointments.queries') : require('/opt/appointments.queries.js');

module.exports = {
    async getAppointmentsForUser() {
        return await queries.getAppointmentsForUser();
    },
    async updateAppointmentBiomarker(appointment) {
        return await queries.updateAppointmentForUser(appointment);
    }
};
