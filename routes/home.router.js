const express = require('express');
const controller = require('../controllers/home.controller');

const route = express.Router();

route.get('/', controller.getHome);

module.exports = route;