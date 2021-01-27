const bill = require('../models/hoadon.model');
const admin = require('../models/admin.model');
const thuonghieu = require('../models/thuonghieu.model');
const sanpham = require('../models/sanpham.model');
const user = require('../models/user.model');
const db = require('../db');

module.exports.loginAdmin = function (req, res) {
    res.render('../views/admin/login.pug');
}

module.exports.getAllBrand = async (req, res) => {
    try {
        const brands = await thuonghieu.findAll();
        res.render('../views/admin/brand.pug',{brands: brands});
    }
     catch (e) {
        console.log(e);
    }
}

module.exports.getBrand = async (req, res) => {
    let idBrand = req.params.idBrand;
    try{
        let brand = await thuonghieu.findOne({
            where:{
                maTH: idBrand
            }
        })
        res.render('../views/admin/brand.pug', {brand:brand});
    }catch(err){
        console.log(err);
    }
}

module.exports.getAllBill = async (req, res) => {
    try{
        let bills = await bill.findAll();
        res.render('../views/admin/bills.pug',{bills: bills});
    }catch(err){
        console.log(err);
    }
}

module.exports.getBill = async (req, res) => {
    let idBill = req.params.idBill;
    try{
        let donhang = await bill.findOne({
            where:{
                maDH: idBill
            }
        })
        let idCart = donhang.maGH;
        let qr = "SELECT * FROM themvao tv, sanpham sp WHERE tv.maSP = sp.maSP AND tv.maGH = "+idCart;
        db.query(qr, async (err, result) => {
            if (err) throw err;
            let cart = [];
            result.forEach(element => {
                let obj = {
                    hinhanhSP: element.hinhanhSP,
                    tenSP: element.tenSP,
                    tonggia: element.giaSP * element.soluong,
                    soluong: element.soluong
                }
                cart.push(obj);
            });
            let total = 0;
            for (let val of cart) {
                total += val.tonggia;
            }
            res.render('../views/admin/bill.pug', { products: cart, total: total, info: donhang });
        });
    }catch(err){
        console.log(err);
    }
}

module.exports.getAllProduct = async (req, res) => {
    let products = await sanpham.findAll({
        attributes: ['maSP', 'hinhanhSP', 'tenSP', 'sanco', 'maTH', 'giaSP']
    });
    res.render('../views/admin/product.pug', {products: products});
}

module.exports.getProduct = async (req, res) => {
    let idProduct = req.params.idProduct;
    try{
        let product = await sanpham.findOne({
            where:{
                maSP: idProduct
            }
        })
        res.render('../views/admin/brand.pug', {product: product});
    }catch(err){
        console.log(err);
    }
}

module.exports.getAllAccount = async (req, res) => {
    try{
        let accounts = await user.findAll();
        res.render('../views/admin/accounts.pug',{accounts: accounts});
    }catch(err){
        console.log(err);
    }
}

module.exports.getAccount = async (req, res) => {
    let idUser = req.params.idAcoount;
    try{
        let account = await user.findOne({
            where:{
                id: idUser
            }
        });
        res.render('../views/admin/account.pug',{account: account});;
    }catch(err){
        console.log(err);
    }
}

module.exports.putProduct = async(req, res)=>{
    let idProduct = req.params.idProduct;
    let tenSP = req.body.tenSP;
    let hinhanhSP = req.body.hinhanhSP;
    let HDH = req.body.HDH;
    let mausac = req.body.mausac;
    let ram = req.body.ram;
    let pin = req.body.pin;
    let manhinh = req.body.manhinh;
    let cpu = req.body.cpu;
    let motaSP = req.body.motaSP;
    let giaSP = parseInt(req.body.giaSP);
    let sanco = req.body.sanco;
    let bonho = req.body.bonho;
    let maTH = parseInt(req.body.maTH);
    let camera_truoc = req.body.camera_truoc;
    let camera_sau = req.body.camera_sau;
    let sim = req.body.sim;
    try{
        await sanpham.update({
            tenSP: tenSP,
            hinhanhSP: hinhanhSP,
            HDH: HDH,
            mausac: mausac,
            ram: ram,
            pin: pin,
            manhinh: manhinh,
            cpu: cpu,
            mataSP: motaSP,
            giaSP: giaSP,
            sanco: sanco,
            bonho: bonho,
            maTH: maTH,
            camera_truoc: camera_truoc,
            camera_sau: camera_sau,
            sim: sim
        },{
            where: {
                maSP: idProduct
            }
        })
    }catch(err){
        console.log(err);
    }
}

module.exports.putBrand = async(req, res)=>{
    let idBrand = req.params.idBrand;
    let tenTH = req.body.tenTH;
    let logoTH = req.body.logoTH;
    try{
        await thuonghieu.update({
            tehTH: tenTH,
            logoTH: logoTH
        },{
            where:{
                maTH: idBrand
            }
        })
    }catch(err){
        console.log(err);
    }
}

module.exports.acceptBill = async (req, res)=>{
    let idBill = parseInt(req.params.idBill);
    try{
        await bill.update({
            trangthai: "Đã xác nhận"
        },{
            where:{
                maDH: idBill
            }
        })
        res.redirect('/admin/bills');
    }catch(err){
        console.log(err);
    }
}

module.exports.cancelBill = async (req, res)=>{
    let idBill = parseInt(req.params.idBill);
    try{
        await bill.update({
            trangthai: "Admin hủy đơn"
        },{
            where:{
                maDH: idBill
            }
        });
        res.redirect('/admin/bills');
    }catch(err){
        console.log(err);
    }
}
module.exports.authAdmin = async (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    try{
        let errors = [];
        let ad = await admin.findOne({
            where:{
                username: username
            }
        })
        if(ad === null){
            errors.push("Tài khoản admin không tồn tại!");
            res.render('../views/admin/login.pug',{errors: errors, username: username, password: password});
            return;
        }
        if(ad.password != password){
            errors.push("Mật khẩu sai!");
            res.render('../views/admin/login.pug',{errors: errors, username: username, password: password});
        }
        res.redirect('/admin/products');
    }catch(err){
        console.log(err);
    }
}