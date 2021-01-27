const users = require('../models/user.model');

module.exports.get = function(req, res){
    let userid = parseInt(req.params);
    const user = await users.findByPk(userid);
    if(!user){
        console.log('No user!');
    }
    res.render('../views/user/user.pug');
}
module.exports.update = function(req, res){
    let userid = parseInt(req.params);
    let password = req.body.password;

    await users.update({password: password},
        {
            where: {
                id: userid
            }
        });
    res.redirect('/user');
}