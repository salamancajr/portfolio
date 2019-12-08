let {Blog} = require("./../models/blog")
let {upload} = require("./../middleware/upload")
const {authenticate} = require("./../middleware/authenticate");
const moment = require("moment");
let fs = require("fs");
const chalk = require('chalk');
const log = console.log;

module.exports = app => {
    app.get("/api/blog", (req, res)=>{
        Blog.find({}).sort({orderNum:+1}).then((data)=>{
            res.send(data)
        })
    })

    app.get("/api/blogform", (req, res)=>{
        res.sendFile(__dirname+"/index2.html")
    })
    ///////delete the blog log//////////////////////////

    app.delete("/api/blog/:id", (req, res) => {
        let _id = req.params.id;


        Blog.removeAndReduceByOne(_id).then(()=>{
            Blog.find({}).then((data)=>{res.status(200).send(data)})

        })
    })

    app.post("/api/blog", upload.single("blogImg"), (req, res)=> {
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

    app.get("/api/blog/:id", (req, res) => {
        let _id = req.params.id;

        Blog.findById({
            _id
        }).then((data) => {
            res.send(data)
        })
    })

    app.patch("/api/blog/:id", (req, res)=>{
        let check;
        let _id = req.params.id;
        let { ipAddress } =  req.body;

        console.log(req.body)
            Blog.findById({_id}).then((data)=>{

                if(req.body.likes){
                    if(data.likes.indexOf(ipAddress)>-1){
                        check = {
                            $pull:{
                                likes:{$in:ipAddress}
                            }
                        }
                    }
                    else{
                        check = {
                            $push:{
                                likes:ipAddress
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

    app.post("/api/blogOrder", (req, res)=>{
        Promise.all([req.body.order.map(item=>{
                Blog.findOneAndUpdate({_id:item.id}, {$set:{orderNum:item.orderNum}}, {new:true}).then(data=>console.log("data",data))
            })
        ]).then(()=>res.sendStatus(200))

    })
}
