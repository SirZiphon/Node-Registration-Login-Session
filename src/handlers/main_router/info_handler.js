'use strict';

const info_function = require('../../handlers_function/main_router/info');

module.exports = function (request, response) {
    info_function((err, data) => {
        response.render('info', {
            title: "info",
            user: request.user,
            error: err,
            node_version: data.node_version,
            express_package_version: data.express_package_version,
            jade_package_version: data.jade_package_version,
            mysql_package_version: data.mysql_package_version,
            client_sessions_package_version: data.client_sessions_package_version,
            mysql_version: data.mysql_version
        });
    });
};