const register = require('./register')

module.exports = {
    summary: 'PFRFA',
    beforeSendResponse: register
};
