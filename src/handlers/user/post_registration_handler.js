'use strict';

const User = require('../../models/user');

module.exports = function (request, response) {
    const user = new User(request.body.username, request.body.password, request.body.confirm_password);

    user.registration((err) => {
        if(err) {
            response.render('registration', {
                title: 'Registration',
                base_path: request.baseUrl,
                alert_message: err.message
            });
            return;
        }

        response.render('registration', {
            title: 'Registration',
            base_path: request.baseUrl,
            alert_message: 'Insertion successfull!'
        });
        return;
    });
};