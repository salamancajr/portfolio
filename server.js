require("./config/config")

const express = require("express");
const mongoose = require("mongoose")
const app = express();
const port = process.env.PORT;
var {Entry} = require("./models/entry.js")
const bodyParser = require('body-parser');
var fs = require("fs");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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

    var data = fs.readFileSync(req.file.path);
    var contentType="image/jpg"



    var entry = new Entry({
        title: req.body.title,
        description: req.body.description,
        link:req.body.link,
        img:{data, contentType}
    })

    entry.save().then(()=>{
        res.status(200).redirect("/api")
    })
})

////////////////////return all photos////////////////////////
app.get("/api", (req, res)=>{

Entry.find({}).then((data)=>{
    res.json(data)

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

app.listen(port)


// app.get("/img", (req, res)=>{
//     Entry.findById("5b3cf99bb8b18d0448dbb093").then((dat)=>{

//     var vals = new Buffer(dat.img.data).toString('base64');


//         res.send(`<div><img style='width:50%' src='data:image/jpeg;base64, ${vals}'</div>`)
//     }, (e)=>{console.log(e);
//     })

// })

