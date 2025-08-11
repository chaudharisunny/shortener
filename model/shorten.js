const mongoose=require('mongoose')

const ShortenSchema=new mongoose.Schema({
    originUrl:{
        type:String,
        required:true 
    },
    shortendUrl:{
        type:String,
        required:true 
    }
},{timestamps:true})

const Shorten=mongoose.model('shortUrl',ShortenSchema)
module.exports=Shorten