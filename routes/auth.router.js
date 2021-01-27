const express = require('express');
const controller = require('../controllers/auth.controller');
const validate = require('../middleware/auth.middleware');

const route = express.Router();

route.get('/login', controller.getLogin);
route.post('/login', controller.authLoginUser);
route.get('/signup', controller.getSignup);
route.post('/signup', controller.authSignup);
module.exports = route;
