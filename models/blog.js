const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BlogSchema = new Schema({
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
        type:Array,
        default:null
    },
    time:{
        type:String,
        required:true
    },
    orderNum:{
        type:Number,
        default:0
    }
})

BlogSchema.statics.removeAndReduceByOne = function(_id){
    var Blog = this;

    return Blog.findById(_id).then((data)=>{
        return data.orderNum
    }).then((data)=>{

        return Promise.all([Blog.updateMany({orderNum:{$gt:data}}, {$inc:{orderNum: -1}}),
            Blog.findOneAndRemove({_id})])
    })
}


var Blog = mongoose.model("Blog", BlogSchema)

module.exports = {Blog}