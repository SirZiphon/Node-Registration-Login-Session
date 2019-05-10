'use strict';

const execSync = require('child_process').execSync;

module.exports = function (callback) {
    let node_version = null;
    let express_package_version = null;
    let jade_package_version = null;
    let mysql_package_version = null;
    let client_sessions_package_version = null;
    let mysql_version = null;
    let error = '';

    try {
        node_version = execSync('node -v').toString();
    } catch (err) {
        error += err.message + "\n";
    }

    try {
        let buffer = execSync('npm list --depth=0').toString();

        express_package_version = (buffer.split('express@').length >= 1 ? buffer.split('express@')[1].split('\n')[0] : "undefined");
        jade_package_version = (buffer.split('jade@').length >= 1 ? buffer.split('jade@')[1].split('\n')[0] : "undefined");
        mysql_package_version = (buffer.split('mysql@').length >= 1 ? buffer.split('mysql@')[1].split('\n')[0] : "undefined");
        client_sessions_package_version = (buffer.split('client-sessions@').length >= 1 ? buffer.split('client-sessions@')[1].split('\n')[0] : "undefined");

    } catch (err) {
        error += err.message + "\n";
    }

    try {
        mysql_version = execSync('mysql --version').toString().toLowerCase().split('ver')[1].trim().split(' ')[0];
    } catch (err) {
        error += err.message + "\n";
    }

    callback(error, {
        node_version: node_version,
        express_package_version: express_package_version, 
        jade_package_version: jade_package_version,
        mysql_package_version: mysql_package_version,
        client_sessions_package_version: client_sessions_package_version,
        mysql_version: mysql_version
    });
};