const db = require('../db');
const thuonghieu = require('../models/thuonghieu.model');

module.exports.getHome = async (req, res) =>{
    let product =[];
    let query = "SELECT * FROM sanpham";
    db.query(query, async (err, results)=>{
        if(err) throw err;
        results.forEach(element => {
            let phone = {
                tenSP: element.tenSP,
                hinhanhSP: element.hinhanhSP,
                giaSP: element.giaSP,
                maSP: element.maSP
            }
            product.push(phone);
        });
        let queryBrand = "SELECT * FROM thuonghieu";
        let brands = [];
        db.query(queryBrand, async (err, rel)=>{
            if(err) throw err;
            rel.forEach(value =>{
                let brand = {
                    maTH: value.maTH,
                    logoTH: value.logoTH,
                    tenTH: value.tenTH
                }
                brands.push(brand);
            });
            res.render('../views/home/home.pug',{products: product,brands:brands});
        });
    });
}
module.exports.getTH = async (req, res)=>{
    const idbrand = parseInt(req.params.idbrand);
    let query = "SELECT * FROM sanpham WHERE maTH ="+idbrand+"";
    db.query(query, async (err, results)=>{
        if(err) throw err;
        let prd = [];
        results.forEach(element=>{
            let pro = {
                tenSP: element.tenSP,
                hinhanhSP: element.hinhanhSP,
                maSP: element.maSP,
                giaSP: element.giaSP
            }
            prd.push(pro);
        });
        let queryBrand = "SELECT * FROM thuonghieu";
        let brands = [];
        db.query(queryBrand, async (err, rel)=>{
            if(err) throw err;
            rel.forEach(value =>{
                let brand = {
                    maTH: value.maTH,
                    logoTH: value.logoTH,
                    tenTH: value.tenTH
                }
                brands.push(brand);
            });
            res.render('../views/home/home.pug',{products: prd,brands:brands});
        });
    });
}