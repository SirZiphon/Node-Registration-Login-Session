'use strict';

const express = require('express');
const router = express.Router();

const info_handler = require('../handlers/main_router/info_handler');

// init main page route
router.route('/')
    .get((request, response) => {
        response.render('index', {
            title: 'Home Page',
            user: request.user
        });
    });

// init info page route
router.route('/info')
    .get(info_handler);

// define page for unrouted requests
router.get('*', (request, response) => {
    response.render('error', {
        title: 'page not found',
        user: request.user,
        requested_page: request.url,
        error_code: '404',
        error_message: `the requested page doesn't exist`
    });
});

module.exports = router;