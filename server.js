require("./config/config")
const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const {ObjectID} = require("mongodb")
const app = express();
const moment = require("moment");
const port = process.env.PORT;
let {Entry} = require("./models/entry.js")
let {Blog} = require("./models/blog")
let {User} = require("./models/users.js")
const {authenticate} = require("./middleware/authenticate");
const bodyParser = require('body-parser');
let multer = require('multer')
let fs = require("fs");
const _ = require("lodash");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.fieldname==="blogImg"){
            cb(null, "./blogUploads")
        }
        else{
            cb(null, "./uploads")
        }
    },

    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})

let upload = multer({
    storage: storage
})


app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use("/uploads", express.static("uploads"))
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use(cors());

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (e) => {
    if (!e) {
        console.log('Connected to mongo');

    } else {
        console.log(e);
    }
})
///////////////for the forms page////////////////////////////////////
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

//////////////upload photo and descriptions///////////////////////

app.post("/api", upload.single("avatar"), authenticate, (req, res) => {
// let imageUrl = `${req.protocol}s://${req.get('host')}/`;

let data = fs.readFileSync(req.file.path)
let contentType = "image/png"


    let entry = new Entry({
        title:req.body.title,
        link:req.body.link,
        githubLink:req.body.githubLink,
        description:req.body.description,
        youtubeLink:req.body.youtubeLink,
        img:{data, contentType}
        // img: imageUrl+req.file.path
    })

    entry.save().then((data) => {

        res.status(200).send(data)
    }, (e) => {
        res.send(e)
    })
})

////////////////////return all photos////////////////////////
app.get("/api", (req, res) => {

    Entry.find({}).then((data) => {
        res.send(data)

    })

})

/////////GET a single post///////////////////////

app.get("/api/:id", (req, res) => {
    let title = req.params.id;


    Entry.findOne({
        title
    }).then((data) => {
        res.send(data)
    })
})


///////delete the project log//////////////////////////

app.delete("/api/:id", authenticate, (req, res) => {
    let _id = req.params.id;


    Entry.findOneAndRemove({
        _id
    }).then((data) => {
         Entry.find({}).then((data)=>{res.status(200).send(data)})


    })
})

//////////update project/////////////////////////////////
app.patch("/api/:id", authenticate, (req, res)=>{
    let _id = req.params.id;


    Entry.findOneAndUpdate({
        _id
    },
    {
        $set:req.body
    }).then(()=>{
        Entry.find({}).then(data=>res.send(data))
    })
})


/////////GET Blog//////////////////////
app.get("/blog", (req, res)=>{
    Blog.find({}).sort({orderNum:+1}).then((data)=>{
        res.send(data)
    })
})


app.get("/blogform", (req, res)=>{
    res.sendFile(__dirname+"/index2.html")
})
///////delete the blog log//////////////////////////

app.delete("/blog/:id", (req, res) => {
    let _id = req.params.id;


    Blog.removeAndReduceByOne(_id).then(()=>{
        Blog.find({}).then((data)=>{res.status(200).send(data)})

    })

    // Blog.findOneAndRemove({
    //     _id
    // }).then((data) => {

    //     Blog.find({}).then((data)=>{res.status(200).send(data)})

    // })
})

//////////Blog Post Route/////////////////
app.post("/blog", upload.single("blogImg"), (req, res)=>{


    let data = fs.readFileSync(req.file.path)
    let contentType = "image/png";
    let time = moment().format("MMMM Do YYYY, h:mm:ss a");

    Blog.find({}).then((dataBlog)=>{
        let orderNum = dataBlog.length
        let blog = new Blog({
            title:req.body.title,
            text:req.body.text,
            likes:req.body.likes,
            time,
            orderNum,
            img:{data, contentType}
        })

        blog.save().then((data)=>{
            res.send(data)
        })

    })


})

/////////////GET BLOG BY TITLE////////////////
app.get("/blog/:id", (req, res) => {
    let _id = req.params.id;



    Blog.findById({
        _id
    }).then((data) => {

        res.send(data)
    })
})

////////////UPDATE BLOG////////////////////////
app.patch("/blog/:id", authenticate, (req, res)=>{
    let check;
    let _id = req.params.id;
        Blog.findById({_id}).then((data)=>{
            if(req.body.likes){
                if(data.likes.indexOf(req.headers["x-forwarded-for"])>-1){
                    check = {
                        $pull:{
                            likes:{$in:req.headers["x-forwarded-for"]}
                         }
                    }
                }
                else{
                    check = {
                        $push:{
                            likes:req.headers["x-forwarded-for"]
                        }
                    }
                }
            }
            else{
                check = {
                        $set:req.body
                }
            }
            return Blog.findOneAndUpdate({_id}, check)
        }).then(()=>{
                Blog.find({}).then(data=>res.send(data))
    })
})

app.post("/signup", async (req, res)=>{

    try{
        let body = _.pick(req.body, ["email", "password"])

        let user = new User(body);

        await user.save()
        const token = await user.generateAuthToken();
        res.header('Access-Control-Expose-Headers', "x-auth");
        res.header("x-auth", token).send(user);

    }catch(e){
        res.status(400).send(e.message)
    }

})

app.post("/signin", async (req, res)=>{

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

app.get("/authenticate", authenticate, (req, res)=>{
    res.status(200).send("authentication passed")
})

app.delete("/token", authenticate, (req, res)=>{

    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }, ()=>{
        res.status(400).send();
    })

})

app.post("/blogOrder", (req, res)=>{
    let prom = new Promise((resolve, reject)=>{
        resolve(req.body.order.map(item=>{
            Blog.findOneAndUpdate({_id:item.id}, {$set:{orderNum:item.orderNum}})
        }))
    })
    prom.then(()=>res.sendStatus(200))

})

app.listen(port, () => {
    console.log(`Now connected on port ${port}`);

})

module.exports = {app}