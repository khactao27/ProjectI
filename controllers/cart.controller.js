const { Op } = require('sequelize');
const cart = require('../models/cart.model');
const sanpham = require('../models/sanpham.model');
const themvao = require('../models/themvao.model');
const bill = require('../models/hoadon.model');
const db = require('../db');
const user = require('../models/user.model');

module.exports.getCart = async (req, res) => {
    let userId = parseInt(req.cookies.userId);
    try {
        let query = "SELECT * FROM giohang, themvao, sanpham WHERE giohang.maGH = themvao.maGH AND sanpham.maSP = themvao.maSP and giohang.userid = " + userId;
        db.query(query, async (error, result) => {
            if (error) throw error;
            let cart = [];
            let nguoidung = await user.findByPk(userId);
            result.forEach(element => {
                let obj = {
                    hinhanhSP: element.hinhanhSP,
                    tenSP: element.tenSP,
                    tonggia: element.giaSP * element.soluong,
                    soluong: element.soluong,
                    maSP: element.maSP
                }
                cart.push(obj);
            })
            let total = 0;
            for (let val of cart) {
                total += val.tonggia;
            }
            res.render('../views/cart/cart.pug', { products: cart, total: total, user: nguoidung});
        });
    } catch (e) {
        console.log(e);
    }
}
module.exports.addtoCart = async (req, res) => {
    let amount = parseInt(req.body.amount);
    let idProduct = parseInt(req.body.id);
    let idUser = parseInt(req.cookies.userId);
    try {
        let enough = await sanpham.findOne({
            where: {
                maSP: idProduct
            }
        })
        if (enough.sanco < amount) {
            res.send("Không đủ số lượng sẵn có vui lòng mua ít hơn!");
        }
        else {
            let giohang = await cart.findOne({
                where: {
                    userid: idUser
                }
            })
            let idCart = giohang.maGH;
            let tontai = await themvao.findOne({
                where: {
                    maGH: idCart,
                    maSP: idProduct
                }
            })
            if (tontai === null) {
                await themvao.create({ maGH: idCart, maSP: idProduct, soluong: amount });
                await sanpham.update({ sanco: enough.sanco - amount }, {
                    where: {
                        maSP: idProduct
                    }
                });
                res.redirect('/cart');
            }
            else {
                await themvao.update({ soluong: enough.soluong + amount }, {
                    where: {
                        maSP: idProduct,
                        maGH: idCart
                    }
                });
                await sanpham.update({ sanco: enough.sanco - amount }, {
                    where: {
                        maSP: idProduct
                    }
                });
                res.redirect('/cart');
            }
        }
    } catch (e) {
        console.log(e);
    }
}
module.exports.bookbill = async (req, res) => {
    let idUser = parseInt(req.cookies.userId);
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const note = req.body.note;
    const fullname = req.body.fullname;
    try {
        let giohang = await cart.findOne({
            where:{
                userid: idUser
            }
        })
        let idCart = giohang.maGH;
        await bill.create({
            diachi: address,
            ngaydat: Date.now(),
            trangthai: 'Chờ xác nhận',
            maGH: idCart,
            admin_id: 1,
            email: email,
            phone: phone,
            fullname: fullname,
            note: note
        });
        let info = {
            fullname: fullname,
            phone: phone,
            email: email,
            address: address,
            note: note
        }
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
            res.render('../views/alert/done.pug', { products: cart, total: total, info: info });
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports.outCart = async (req, res) => {
    res.redirect('/cart');
}