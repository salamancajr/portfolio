const projectRouter = require("express").Router()
let {Entry} = require("../models/entry.js")
let {upload} = require("../middleware/upload")
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const {authenticate} = require("../middleware/authenticate");
let fs = require("fs");

projectRouter.get("/api", (req, res) => {

    Entry.find({}).sort({orderNum:+1}).then((data) => {
        res.send(data)

    })
})


projectRouter.post("/api", upload.single("avatar"), authenticate, (req, res) => {
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


projectRouter.get("/api/:id", (req, res) => {
    let title = req.params.id;


    Entry.findOne({
        title
    }).then((data) => {
        res.send(data)
    })
})


projectRouter.delete("/api/:id", authenticate, (req, res) => {
    let _id = req.params.id;

    Entry.findOneAndRemove({
        _id
    })
    .then(( ) => Entry.find({}).then((data)=>{res.status(200).send(data)}))
})


projectRouter.patch("/api/:id", authenticate, (req, res)=>{
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


projectRouter.post("/projectOrder", authenticate, (req, res)=>{

    Promise.all([req.body.order.map(item=>{
            Entry.findOneAndUpdate({_id:item.id}, {$set:{orderNum:item.orderNum}}, {new:true}).then((data)=>console.log("data",data))
        })
    ]).then(()=>res.sendStatus(200))
})


projectRouter.post("/img-compress", (req, res)=>{

    Entry.find({}).then(data=>{

        async function min (i){
            //turn buffer into file
           fs.appendFileSync(__dirname+"/"+i+".png", new Buffer(data[i].img.data));


            const files = await
            imagemin([__dirname+"/"+i+".png"], 'build/images', {
                plugins: [
                    imageminJpegtran(),
                    imageminPngquant({quality: '65-80'})
                ]
            })
            Entry.findOneAndUpdate({_id:data[i]._id},{
                $set:{"img":{data:files[0].data, contentType:"img/png"}
            }
            }).then(( )=>{

                if(i+1==data.length){
                    let images = fs.readdirSync(__dirname+"/build/images")
                    images.map(image=>{
                        fs.unlinkSync(__dirname+`/build/images/${image}`)
                        fs.unlinkSync(__dirname+`/${image}`)
                    })

                    console.log("i", i)
                    res.sendStatus(200)
                }
                else{
                    console.log(i)
                    min(i+=1)
                }
            })
        }
        min(0)
    })
})

module.exports = {projectRouter}