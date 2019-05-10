'use strict';

module.exports = function (request, response, next) {
    console.log('START CALL INFO-----------------------------');
    console.log(`REQUEST AT: ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`);
    console.log(`REQUEST URL: ${request.url}`);
    console.log(`REQUEST METHOD TYPE: ${request.method}`);
    console.log('END CALL INFO-------------------------------');

    next();
}