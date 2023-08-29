
const queries = require('/opt/users.queries.js');

module.exports = {
    async putBiomarkersForUser(user) {
        await queries.putBiomarkersForUser(user);
    },
    async postUser(user) {
        await queries.postUser(user);
    }
};