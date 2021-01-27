const express = require('express');
const controller = require('../controllers/product.controller');
const controllerHome = require('../controllers/home.controller');

const route = express.Router();

route.get('/:id', controller.getProduct);
route.get('/', controllerHome.getTH);

module.exports = route;