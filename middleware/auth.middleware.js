const db = require('../db');

module.exports.validateLogin = async (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let query = "SELECT * FROM user WHERE username ='"+username+"'AND password ='"+password+"'";
    db.query(query, async (err, result)=>{
        if(err) throw err;
        if(!result){
            res.redirect('/');
            next();
        }
        else{
            res.redirect('/login');
        }
    });
}