const sanpham = require('../models/sanpham.model');

module.exports.getProduct = async (req, res) => {
    let id = parseInt(req.params.id);
   try {
       let product = await sanpham.findByPk(id);
       res.render('../views/product/product.pug', { product: product });
    }catch(e){
        console.log(e.getMessage());
    }
}