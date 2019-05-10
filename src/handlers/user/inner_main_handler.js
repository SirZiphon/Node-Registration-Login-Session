'use strict';

module.exports = function (request, response) {
    response.render('inner_main', {
        title: "Inner Main",
        user: request.user
    });
};