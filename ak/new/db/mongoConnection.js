const mongoose=require('mongoose')
require('dotenv').config()

const connectMongoDB =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            userNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('MongoDB connected')
    }catch(error){
        console.log('MongoDB connection error:',error.message)
        process.exit(1);
    }
}

module.exports=connectMongoDB;