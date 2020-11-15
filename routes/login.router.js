const express = require('express');
const controller = require('../controllers/login.controller');
const validate = require('../middleware/auth.middleware');

const route = express.Router();

route.get('/', controller.getLogin);
route.post('/', validate.validateLogin);
route.get('/signup', controller.signup);
route.post('/signup', controller.createUser);
// route.post('/signup', controller.signup);

module.exports = route;