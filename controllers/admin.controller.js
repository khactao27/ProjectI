const db = require('../db');

module.exports.loginAdmin = function(req, res){
    res.render('../views/admin/signin.pug');
}
module.exports.getHome = async (req, res)=>{
    res.render('../views/admin/managebill/manage.pug');
}