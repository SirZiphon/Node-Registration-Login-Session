'use strict';

module.exports = function (request, response) {
    response.render('inner_main', {
        title: "Inner Main",
        base_path: request.baseUrl,
        user: request.user
    });
};