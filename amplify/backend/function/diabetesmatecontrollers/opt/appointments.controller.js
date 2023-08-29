const queries = require('/opt/appointments.queries.js');

module.exports = {
    async getAppointmentsForUser(){
        return await queries.getAppointmentsForUser();
    }
};
