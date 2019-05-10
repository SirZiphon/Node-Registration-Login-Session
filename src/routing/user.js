'use strict';

const express = require('express');
const router = express.Router();

// handlers
const get_login_handler = require('../handlers/user/get_login_handler');
const post_login_handler = require('../handlers/user/post_login_handler');
const get_registration_handler = require('../handlers/user/get_registration_handler');
const post_registration_handler = require('../handlers/user/post_registration_handler');
const logout_handler = require('../handlers/user/logout_handler');
const inner_main_handler = require('../handlers/user/inner_main_handler');

// middlewares
const active_session_redirect = require('../middlewares/active_session_redirect');
const deactive_session_redirect = require('../middlewares/deactive_session_redirect');

router.route('/login')
    .get(active_session_redirect, get_login_handler)
    .post(active_session_redirect, post_login_handler);

router.route('/registration')
    .get(active_session_redirect, get_registration_handler)
    .post(active_session_redirect, post_registration_handler);

router.route('/logout')
    .get(logout_handler);

router.route('/inner_main')
    .get(deactive_session_redirect, inner_main_handler);

module.exports = router;