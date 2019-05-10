'use strict';

const db_connection = require('../scripts/db_connection');
const user_queries = require('../../config/query.json').users;
const pattern = require('../../config/config.json').registration_pattern.string_pattern;

const regexp = new RegExp(pattern);

function User(username, password, confirm_password) {
    Object.defineProperty(this, "_username", {
        writable: false,
        value: regexp.test(username) ? username : null,
        configurable: false,
        enumerable: false
    });

    Object.defineProperty(this, "_password", {
        writable: false,
        value: regexp.test(password) ? password : null,
        configurable: true,
        enumerable: false
    });

    Object.defineProperty(this, "_confirm_password", {
        writable: false,
        value: regexp.test(confirm_password) ? confirm_password : null,
        configurable: true,
        enumerable: false
    });

    /**
     * this method execute the login check with the contained parameters; 
     * to prevent the method from being invoked multiple times, the password is deleted
     */
    this.login = function (callback) {
        // check parameters
        if (!this._username || !this._password) {
            callback(new Error("There are empty parameters!"));
            return;
        }

        // init db connection
        let con = db_connection.create_connection();

        // execute query
        db_connection.query(con, user_queries.select_login, [this._username, this._password], (err, result) => {
            delete this._password;  // the login will be done only one time for object

            if (err) {
                callback(err);
                return;
            }

            // check the result
            switch (result.length) {
                case 0:
                    callback(new Error('The user or the password doesn\'t match'));
                    return;

                case 1:
                    callback();
                    return;

                default:
                    callback(new Error('Query error: too many results!'));
                    return;
            }
        });
    };

    /**
     * this method save the new user into the db; 
     * to prevent the method from being invoked multiple times, the password is deleted
     */
    this.registration = function (callback) {
        // check parameters
        if (!this._username || !this._password || !this._confirm_password) {
            callback(new Error("There are empty parameters!"));
            return;
        }

        // init db connection
        let con = db_connection.create_connection();

        // execute query
        db_connection.query(con, user_queries.insert, [this._username, this._password], (err, result) => {
            // deletion of the passwords
            delete this._password;
            delete this._confirm_password;

            if (err) {
                callback(err);
                return;
            }

            callback(null, result);
            return;
        });
    };

    /**
     * this method check if the current user is present into the db;
     * this method must only be used for checking during an active session
     */
    this.db_check = function (callback) {
        // check the user
        if (!this._username) {
            callback(new Error('No user to check!'));
            return;
        }

        // init db connection
        let con = db_connection.create_connection();

        // execute query
        db_connection.query(con, user_queries.select_session, [this._username], (err, result) => {
            if (err) {
                callback(err);
                return;
            }

            // check the result
            switch (result.length) {
                case 1:
                    callback();
                    return;

                default:
                    callback(new Error('No user Found!'));
                    return;
            }
        });
    };
}

module.exports = User;