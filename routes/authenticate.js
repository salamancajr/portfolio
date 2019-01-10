const authenticateRouter = require("express").Router()
let {User} = require("../models/users.js")
const {authenticate} = require("../middleware/authenticate");
const _ = require("lodash");

authenticateRouter.post("/signup", async (req, res)=>{
    try{
        let body = _.pick(req.body, ["email", "password"])

        let user = new User(body);

        await user.save()
        const token = await user.generateAuthToken();
        res.header('Access-Control-Expose-Headers', "x-auth");
        res.header("x-auth", token).send(user);

    }
    catch(e){
        res.status(400).send(e.message)
    }

})

authenticateRouter.post("/signin", async (req, res)=>{

    try{
        let email = req.body.email;
        let password = req.body.password;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.header('Access-Control-Expose-Headers', "x-auth");
        res.header("x-auth", token).send(user);
    } catch(e){
        console.log(e);
        res.status(400).send();

    }

})

authenticateRouter.get("/authenticate", authenticate, (req, res)=>{
    res.status(200).send("authentication passed")
})

authenticateRouter.delete("/token", authenticate, (req, res)=>{

    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }, ()=>res.status(400).send())

})

module.exports = {authenticateRouter}