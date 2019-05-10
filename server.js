'use strict';

const conf_server = require('./config/config.json').server;
const conf_session = require('./config/config.json').session;

const express = require('express');
//const https = require('https');
const http = require('http');
const fs = require('fs');
const session = require('client-sessions');

// Routers
const main_router = require('./src/routing/main_router');
const user = require('./src/routing/user');

// middlewares
const server_report = require('./src/middlewares/server_report');
const check_session = require('./src/middlewares/check_session');

// creation of the server
const app = express();

// define server options
//const options = {
//    key: fs.readFileSync(__dirname + '/keys/privatekey.key'),
//    cert: fs.readFileSync(__dirname + '/keys/certificate.pem')
//  };

// configuration of the session
app.use(session({
    cookieName: conf_session.cookieName,
    secret: conf_session.secret, // random string
    duration: conf_session.duration, // duration of the session in ms
    activeDuration: conf_session.activeDuration,
    cookie: {
        httpOnly: true, // prevents browser JavaScript from accessing cookies
//        secure: true, // ensures cookies are only used over HTTPS
        ephemeral: true // delete cookies when the browser is closed
    }
}));

// init jade into express and set base directory
app.set('view engine', 'jade');
app.set('views', __dirname + '/src/views'); 

// init the "public" directory
app.use('/', express.static(__dirname + '/public'));

// init the middleware for access to post data
app.use(express.urlencoded({ extended: true }));

// init others middleware
app.use(server_report);
app.use(check_session);

// define the routes
app.use('/user', user);
app.use('/', main_router);

// start the server
http.createServer(app).listen(conf_server.http_port, () => {
    console.log(`HTTP Server started at port ${conf_server.http_port}`);
})
//https.createServer(options, app).listen(conf_server.https_port, () => {
//    console.log(`HTTPS Server started at port ${conf_server.https_port}`);
//});
