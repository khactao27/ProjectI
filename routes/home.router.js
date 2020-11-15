const express = require('express');
const controller = require('../controllers/home.controller');

const route = express.Router();

route.get('/home', controller.getHome);

module.exports = route;