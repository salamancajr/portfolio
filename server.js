require("./config/config")
const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT;
var {Entry} = require("./models/entry.js")
var {Blog} = require("./models/blog")
const bodyParser = require('body-parser');
var multer = require('multer')
var fs = require("fs");
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
var upload = multer({
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
mongoose.connect(process.env.MONGODB_URI, (e) => {
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

app.post("/api", upload.single("avatar"), (req, res) => {
// var imageUrl = `${req.protocol}s://${req.get('host')}/`;

var data = fs.readFileSync(req.file.path)
var contentType = "image/png"


    var entry = new Entry({
        title:req.body.title,
        link:req.body.link,
        githubLink:req.body.githubLink,
        description:req.body.description,
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

app.delete("/api/:id", (req, res) => {
    let _id = req.params.id;


    Entry.findOneAndRemove({
        _id
    }).then((data) => {
        console.log(data);

        res.status(200).send(data)
    })
})

/////////GET Blog//////////////////////
app.get("/blog", (req, res)=>{
    Blog.find({}).then((data)=>{
        res.send(data)
    })
})


app.get("/blogform", (req, res)=>{
    res.sendFile(__dirname+"/index2.html")
})
///////delete the blog log//////////////////////////

app.delete("/blog/:id", (req, res) => {
    let _id = req.params.id;


    Blog.findOneAndRemove({
        _id
    }).then((data) => {
        console.log(data);

        res.status(200).send(data)
    })
})

//////////Blog Post Route/////////////////
app.post("/blog", upload.single("blogImg"),(req, res)=>{


    var data = fs.readFileSync(req.file.path)
var contentType = "image/png"
console.log(req.file);

    var blog = new Blog({
        title:req.body.title,
        text:req.body.text,
        likes:req.body.likes,
        img:{data, contentType}
    })

    blog.save().then((data)=>{
        res.send(data)
    })
})

/////////////GET BLOG BY TITLE////////////////
app.get("/blog/:id", (req, res) => {
    let _id = req.params.id;



    Blog.findById({
        _id
    }).then((data) => {
        console.log("data", data);

        res.send(data)
    })
})

app.listen(port, () => {
    console.log(`Now connected on port ${port}`);

})