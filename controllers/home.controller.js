const sanpham = require('../models/sanpham.model');
const thuonghieu = require('../models/thuonghieu.model');
const users = require('../models/user.model');

module.exports.getHome = async (req, res) => {
    let idUser = parseInt(req.cookies.userId);
    try {
        let user;
        if (idUser) {
            user = await users.findByPk(idUser);
        }
        const products = await sanpham.findAll({
            attributes: ['tenSP', 'hinhanhSP', 'giaSP', 'maSP', 'sanco']
        });
        let brands = await thuonghieu.findAll({
            attributes: ['maTH', 'tenTH', 'logoTH']
        });
        if (user) {
            res.render('../views/home/home.pug', { products: products, brands: brands, idUser: idUser, user: user });
        }
        else {
            res.render('../views/home/home.pug', { products: products, brands: brands, idUser: idUser });
        }
    } catch (err) {
        console.log(err);
    }
}
module.exports.getTH = async (req, res) => {
    let idUser = parseInt(req.cookies.userId);
    try {
        let user;
        if (idUser) {
            user = await users.findByPk(idUser);
        }
        let idBr = req.query.id;
        let products = await sanpham.findAll({
            attributes: ['tenSP', 'hinhanhSP', 'giaSP', 'maSP', 'sanco'],
            where: {
                maTH: idBr
            }
        });
        let brands = await thuonghieu.findAll({
            attributes: ['maTH', 'tenTH', 'logoTH']
        });
        if (user) {
            res.render('../views/home/home.pug', { products: products, brands: brands, idUser: idUser, user: user });
        }
        else {
            res.render('../views/home/home.pug', { products: products, brands: brands, idUser: idUser });
        }
    } catch (err) {
        console.log(err);
    }
}
function money(value) {
    return Math.floor(Number(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
