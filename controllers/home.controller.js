const db = require('../db');

module.exports.getHome = async (req, res) =>{
    let product =[];
    let brands =[];
    let query = "SELECT * FROM sanpham";
    db.query(query, async (err, results)=>{
        if(err) throw err;
        results.forEach(element => {
            let phone = {
                tenSP: element.tenSP,
                hinhanhSP: element.hinhanhSP,
                giaSP: element.giaSP,
                id: element.maSP
            }
            product.push(phone);
        });
        res.render('../views/home/home.pug',{products: product,brands:brands});
    });
}