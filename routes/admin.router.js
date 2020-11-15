const express = require('express');
const controller = require('../controllers/admin.controller');

const route = express.Router();

route.get('/login', controller.loginAdmin);
route.get('/home', controller.getHome);

module.exports = route;