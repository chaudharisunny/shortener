const mongoose=require('mongoose')
require('dotenv').config()
const connectDB=()=>{
    try {
        mongoose.connect(process.env.mongoose_URI)
        .then(()=>{
            console.log('database connect')
        }).catch((error)=>{
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports={connectDB}
