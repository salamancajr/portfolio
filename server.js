require("./config/config")
const download = require('image-downloader')
const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const request = require("request");
const app = express();
const port = process.env.PORT;
var {Entry} = require("./models/entry.js")
const bodyParser = require('body-parser');
var fs = require("fs");
var multer  = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads/")
    },
    filename:function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})
var upload = multer({ storage: storage})
var path = require('path')



app.use(bodyParser.json({limit: '50mb'}));
app.use("/uploads", express.static("uploads"))
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, (e)=>{
    if(!e){
        console.log('Connected to mongo');

    }
    else{console.log(e);
    }
})
///////////////for the forms page////////////////////////////////////
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

//////////////upload photo and descriptions///////////////////////
app.post("/api", upload.single("avatar"), (req, res)=>{

        // var github = req.body.githubLink.toString();
        // var data= req.body.image;
        // var data = fs.readFileSync(__dirname+"/uploads")
        // var contentType="image/jpg";
console.log(req.file);


// var file = fs.readFileSync(__dirname+`/${req.file.path}`)
        var entry = new Entry({
            title: req.body.title,
            description: req.body.description,
            link:req.body.link,
            githubLink:req.body.githubLink,
            img:req.file.path
        })

        entry.save().then((data)=>{
            res.status(200).send(data)
        })






    //     var data = fs.readFileSync(__dirname+"/uploads");
    // var contentType="image/jpg"

    // var data = fs.readFileSync(req.body.imageData);

})

////////////////////return all photos////////////////////////
app.get("/api", (req, res)=>{

Entry.find({}).then((data)=>{
    res.send(data)

})

})

/////////GET a single post///////////////////////

app.get("/api/:id", (req, res)=>{
    let title=req.params.id;


    Entry.findOne({title}).then((data)=>{
        res.send(data)
    })
})


///////delete the project log//////////////////////////

app.delete("/api/:id", (req, res)=>{
    let title=req.params.id;
    console.log(title);

    Entry.findOneAndRemove({title}).then((data)=>{
        res.status(200).send()
    })
})



app.listen(port, ()=>{
    console.log(`No connected on port ${port}`);

})


// app.get("/img", (req, res)=>{
//     Entry.findById("5b3cf99bb8b18d0448dbb093").then((dat)=>{

//     var vals = new Buffer(dat.img.data).toString('base64');


//         res.send(`<div><img style='width:50%' src='data:image/jpeg;base64, ${vals}'</div>`)
//     }, (e)=>{console.log(e);
//     })

// })

