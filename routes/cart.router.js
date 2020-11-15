const express = require('express');
const controller = require('../controllers/cart.controller');

const route = express.Router();

route.get('/', controller.getCart);

module.exports = route;