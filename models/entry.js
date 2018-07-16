var mongoose = require("mongoose");

var Entry = mongoose.model("Entry", {
    // title: {
    //     type: "string",
    //     required: true,
    //     minlength: 1,
    //     trim: true
    // },
    // link: {
    //     type: "string",
    //     required: true,
    //     minlength: 1,
    //     trim: true
    // },
    // githubLink: {
    //     type: "string",
    //     required: true,
    //     minlength: 1,
    //     trim: true
    // },
    // description: {
    //     type: "string",
    //     required: true,
    //     minlength: 1,
    //     trim: true
    // },
    // img: {
    //     data: Buffer,
    //     contentType: String
    // }
    img: {
        type:String,
        required:true
    }

})

module.exports = {Entry};