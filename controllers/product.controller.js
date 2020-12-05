let db = require('../db');

module.exports.getProduct = function(req, res){
    let id = parseInt(req.query.id);
    let query = "SELECT * FROM sanpham WHERE maSP="+id+"";
    db.query(query, async (err, results)=>{
        if(err) throw err;
        let product;
        results.forEach(result =>{
            product ={
                maSP: result.maSP,
                tenSP: result.tenSP,
                hinhanhSP: result.hinhanhSP,
                HDH: result.HDH,
                ram: result.ram,
                pin: result.pin,
                manhinh: result.manhinh,
                cpu: result.cpu,
                motaSP: result.motaSP,
                giaSP: result.giaSP,
                soluong: result.soluong,
                bonho: result.bonho,
                maTH: result.maTH,
                camera_truoc: result.camera_truoc,
                camera_sau: result.camera_sau,
                sim: result.sim
            }
        });
        res.render('../views/product/product.pug',{product: product});
    });
}