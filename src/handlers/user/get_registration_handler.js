'use strict';

const pattern = require('../../../config/config.json').registration_pattern;

module.exports = function (request, response) {
    response.render('registration', {
        title: "Registration",
        pattern: pattern.string_pattern, 
        message_pattern: pattern.usable_caracters
    });
};