const db = require('../db');

module.exports.getCart = function(req, res){
    let qr = "SELECT * FROM themvao tv, sanpham sp WHERE tv.maSP = sp.maSP AND tv.maGH = 1";
    db.query(qr, async (err, result)=>{
        if(err) throw err;
        let cart=[];
        result.forEach(element=>{
            let obj = {
                hinhanhSP: element.hinhanhSP,
                tenSP: element.tenSP,
                tonggia: element.giaSP * element.soluong,
                soluong: element.soluong
            }
            cart.push(obj);
        });
        let total = 0;
        for(let val of cart){
            total += val.tonggia;
        }
        res.render('../views/cart/cart.pug',{products: cart, total:total});
    });
}
module.exports.addtoCart = async (req, res)=>{
    const amount = parseInt(req.body.amount);
    const idPro = parseInt(req.body.id);
    let queryPd = `SELECT soluong FROM sanpham WHERE maSP = ${idPro}`;
    db.query(queryPd, async (err, result)=>{
        if(err) throw err;
        result.forEach(element => {
            if(element.soluong < amount){
                res.send("Vượt quá số dư!")
            }
        });
    });
    let queryTV = `SELECT * FROM themvao WHERE maSP = ${idPro}`;
    db.query(queryTV, async (err, result)=>{
        if(err) throw err;
        result.forEach(element=>{
            if(element.maGH === 1){
                let temp = element.soluong + amount;
                let queryUd = `UPDATE themvao (soluong) VALUES soluong = ${temp}`;
                db.query(queryUd, (err)=>{
                    if(err) throw err;
                });
                res.redirect('/home');
            }
        });

    });
}
module.exports.bill = async (req, res)=>{
    const diachi = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const note = req.body.note;
    const fullname = req.body.fullname;
    
}