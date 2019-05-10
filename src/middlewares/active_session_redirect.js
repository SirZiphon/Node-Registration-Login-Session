'use strict';

const session_name = require('../../config/config.json').session.cookieName; 

function active_session_redirect (request, response, next) {
    if (request[session_name] && request[session_name].user) {
        response.redirect('/');
    } else {
        next();
    }
}

module.exports = active_session_redirect;