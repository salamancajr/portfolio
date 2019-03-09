var {User} = require("./../models/users");

var authenticate = (req, res, next)=>{
    if (req.body.likes){
        return next();
    }
    var token = req.header("x-auth");

    User.findByToken(token).then((user)=>{

        if(!user){
            return Promise.reject();
        }
        req.user = user;
        req.token = token;

        next();
    }).catch((e)=>{

        res.status(401).send();
    })
}
module.exports = {authenticate}