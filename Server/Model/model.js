const  mongoose = require("mongoose")

const blogSchema=mongoose.Schema({
    Start:String,
    Destination:String,
    Email:String,
    Password:String,
})

const blogModel = mongoose.model("register", blogSchema)

module.exports = blogModel