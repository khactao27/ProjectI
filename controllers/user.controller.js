const db = require('../db');

module.exports.get = function(req, res){
    let userid = parseInt(req.params);
    db.query("SELECT * FROM user WHERE id ="+userid+"",async(err, results)=>{
        if(err) throw err;
        let user = {
            username: results.username,
            fullname: results.fullname,
            gender: results.gender,
            dob: results.dob,
            phone: results.phone,
            avatar: results.avatar
        }
        res.render('../views/user/user.pug',{user: user});
    })
}
module.exports.update = function(req, res){
    let userid = parseInt(req.params);
    let user = req.body;
    db.query("UPDATE user SET fullname = , gender =, phone =, avatar=, dob= WHERE user.id = userid");
}