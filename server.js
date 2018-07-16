require("./config/config")
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
var upload = multer({ dest: 'uploads/' })

// function errorHandler (err, req, res, next) {
//     res.status(500)
//     res.render('error', { error: err })
//   }
// app.use(errorHandler);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
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
app.post("/api",  upload.single("avatar"), (req, res)=>{


// request.get(req.body.imageData, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         var data =  "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
// var data = req.body.imageData;
//          var contentType="image/jpg"


        var entry = new Entry({
            title: req.body.title,
            description: req.body.description,
            link:req.body.link,
            githubLink:req.body.githubLink,

            // img:{data, contentType}
        })

        entry.save().then((data)=>{
            res.status(200).send(data)
        })





//     }
// });
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



app.listen(port)


// app.get("/img", (req, res)=>{
//     Entry.findById("5b3cf99bb8b18d0448dbb093").then((dat)=>{

//     var vals = new Buffer(dat.img.data).toString('base64');


//         res.send(`<div><img style='width:50%' src='data:image/jpeg;base64, ${vals}'</div>`)
//     }, (e)=>{console.log(e);
//     })

// })

