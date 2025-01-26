const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:['Admin','Manager','HR','Employee'],required:true},    
},{timestamps:true})

const user = mongoose.model('user',user)

module.exports = user