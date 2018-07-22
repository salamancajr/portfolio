const mongoose = require("mongoose");
var Blog = mongoose.model("Blog", {
    title:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    text:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    img: {
        data: Buffer,
        contentType: String

    },
    likes:{
        type:Number,
        default:0,
        required:true
    }

})

module.exports ={Blog}