const db = require('../db');

module.exports.getCart = function(req, res){
    res.render('../views/cart/cart.pug');
}