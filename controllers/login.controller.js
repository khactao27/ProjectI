const db = require('../db');

module.exports.getLogin = function(req, res){
    res.render('../views/login/signin.pug');
}
module.exports.signup = async (req, res)=>{
    res.render('../views/login/signup.pug');
}
module.exports.createUser = async (req, res)=>{
    res.redirect('/');
}