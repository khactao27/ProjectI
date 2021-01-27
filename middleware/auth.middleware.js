const User = require('../models/user.model');

module.exports.requireAuth = async (req, res, next)=>{
    if(!req.cookies.userId){
        res.redirect('/auth/login');
        return;
    }
    try{
        const user = await User.findByPk(req.cookies.userId);
        if(user === null){
            res.redirect('/auth/login');
            return;
        }
    }catch(e){
        console.log(e);
    }
    next();
}