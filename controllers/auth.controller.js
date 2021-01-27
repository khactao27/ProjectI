const users = require('../models/user.model');
const cart = require('../models/cart.model');

module.exports.getLogin = function(req, res){
    res.clearCookie('userId');
    res.render('../views/auth/login.pug');
}
module.exports.authLoginUser = async (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    try{
        let errors = [];
        let user = await users.findOne({
            where:{
                username: username
            }
        })
        if(user === null){
            errors.push("Tài khoản không tồn tại!");
            res.render('../views/auth/login.pug',{errors: errors, username: username, password: password});
            return;
        }
        if(user.password != password){
            errors.push("Mật khẩu sai!");
            res.render('../views/auth/login.pug',{errors: errors, username: username, password: password});
        }
        res.cookie('userId', user.id);
        res.redirect('/');
    }catch(err){
        console.log(err);
    }
}

module.exports.getSignup = async(req, res)=>{
    res.render('../views/auth/signup.pug');
}

module.exports.authSignup = async (req, res) =>{
    let fullname = req.body.fullname;
    let username = req.body.username;
    let password = req.body.password;
    let passAgain = req.body.passAgain;
    let email = req.body.email;

    try{
        await users.create({
            fullname: fullname,
            username: username,
            password: password,
            email: email
        });
        let user = await users.findOne({
            where: {
                username: username
            }
        });
        let idUser = user.id;
        await cart.create({
            userid: idUser,
            tongTien: 0
        })
        res.redirect('/auth/login');
    }catch(err){
        console.log(err);
    }
}

module.exports.checkAdmin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const ad = await admin.findOne({
        where: {
            username: username,
            password: password
        }
    });
    if (!ad) {
        res.redirect('/admin/login');
    }
    else {
        res.redirect('/admin');
    }
}
