const express = require('express');
const controller = require('../controllers/admin.controller');

const route = express.Router();

route.get('/auth/login', controller.loginAdmin);
route.post('/auth/login', controller.authAdmin);

route.get('/brands', controller.getAllBrand);
route.get('/brands/:idBrand', controller.getBrand);

route.get('/products', controller.getAllProduct);
route.get('/products/:idProduct', controller.getProduct);

route.get('/bills', controller.getAllBill);
route.get('/bills/:idBill', controller.getBill);
route.post('/bills/:idBill', controller.acceptBill);
route.post('/bills/cancel/:idBill', controller.cancelBill);

route.get('/accounts', controller.getAllAccount);
route.get('/accounts/:idAccount', controller.getAccount);

module.exports = route;