'use strict';

const session_name = require('../../../config/config.json').session.cookieName; 

module.exports = function (request, response) {
    if(request[session_name]) {
        request[session_name].reset();
    }

    response.redirect('/');
};