'use strict';

const session_name = require('../../config/config.json').session.cookieName; 

function deactive_session_redirect (request, response, next) {
    if (request[session_name] && request[session_name].user) {
        next();
    } else {
        response.redirect('/');
    }
}

module.exports = deactive_session_redirect;