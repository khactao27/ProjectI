const express = require('express');
const controller = require('../controllers/product.controller');

const route = express.Router();

route.get('/', controller.getProduct);

module.exports = route;