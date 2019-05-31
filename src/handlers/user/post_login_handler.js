'use strict';

const User = require('../../models/user');
const session_name = require('../../../config/config.json').session.cookieName; 

module.exports = function (request, response) {
    const user = new User(request.body.username, request.body.password);

    user.login((err) => {
        if (err) {
            response.render('login', {
                alert_message: err.message,
                title: 'login',
                base_path: request.baseUrl
            });
            return;
        }

        request[session_name].user = request.body.username;

        response.render('index', {
            title: 'Home page',
            base_path: request.baseUrl,
            user: request.body.username
        });
        return;
    });
};