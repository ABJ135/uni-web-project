const mongoose = require('mongoose')
require('dotenv').config()

const URL = process.env.Mongo_URL

mongoose.connect(URL)

const db = mongoose.connection

db.on("connected",()=>{
    console.log("mongo db is connected")
})

db.on("disconnected",()=>{
    console.log("mongo db is no connected")
})

db.on("error",()=>{
    console.log("Error connecting mongo db")
})

module.exports = db