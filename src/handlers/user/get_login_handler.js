'use strict';

const pattern = require('../../../config/config.json').registration_pattern;

module.exports = function (request, response) {
    response.render('login', {
        title: "login",
        base_path: request.baseUrl,
        pattern: pattern.string_pattern
    });
};