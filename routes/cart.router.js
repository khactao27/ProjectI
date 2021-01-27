const express = require('express');
const controller = require('../controllers/cart.controller');

const route = express.Router();

route.get('/', controller.getCart);
route.post('/', controller.addtoCart);
route.post('/info', controller.bookbill);
route.delete('/delete', controller.outCart);

module.exports = route;