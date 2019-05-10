'use strict';

const sql_server = require('../../config/mysql_config.json');
const mysql = require('mysql');

module.exports.create_connection = function() {
    return mysql.createConnection({
        host: sql_server.host,
        user: sql_server.user,
        password: sql_server.password,
        database: sql_server.database
    });
};

module.exports.query = function(connection, sql, parameters, callback) {

    connection.connect((err) => {
        if (err) {
            console.log('DB CONNECTION ERROR: ' + err.message);
            if (err.code == 'ER_ACCESS_DENIED_ERROR') {
                callback(new Error('ER_ACCESS_DENIED_ERROR: wrong credentials!'));
                return;
            } else {
                callback(err);
                return;
            }
        }

        console.log('Db Connected!');

        connection.query(sql, parameters, (err, result) => {
            if (err) {
                console.log('QUERY ERROR: ' + err.message);
                callback(err);
                return;
            }

            callback(null, result);
        });
    });
};