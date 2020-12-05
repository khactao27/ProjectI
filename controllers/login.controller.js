const db = require('../db');

module.exports.getLogin = function(req, res){
    res.render('../views/login/signin.pug');
}
module.exports.validateLogin = async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    let query = `SELECT * FROM user`;
    db.query(query, async (err, result) =>{
        if(err) throw err;
        result.forEach(element => {
            if(element.username === username && element.password === password){
                res.redirect('/home');
            }
        });
        res.render('../views/login/signin.pug');
    });
}
module.exports.signup = async (req, res)=>{
    res.render('../views/login/signup.pug');
}
module.exports.createUser = async (req, res)=>{
    res.redirect('/');
}