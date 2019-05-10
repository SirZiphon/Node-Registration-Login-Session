'use strict';

const User = require('../models/user');
const session_name = require('../../config/config.json').session.cookieName; 

function check_session (request, response, next) {
    // security check: the request cannot have sensitive parameters that can only be added by check_session
    if (request.user) {
        console.log('Warning security!');
        delete request.user;
    }

    if (request[session_name] && request[session_name].user) {

        let user = new User(request[session_name].user);
        user.db_check((err) => {
            if(err) {
                // destroy the session
                request[session_name].reset();
                response.redirect('/');
            } else {
                request.user = request[session_name].user;
                request[session_name].user = request[session_name].user;
                next();
            }            
        });
    } else {
        next();
    }
}

module.exports = check_session;