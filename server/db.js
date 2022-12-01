const mongoose = require("mongoose");
require('dotenv').config()

const connectDB = async () => {
    try{
        const url = process.env.MONGO_URI;
        const conn = await mongoose.connect(url,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log(`Mongodb Database Connected!`);
    } 
    catch(error){
        console.log(`error: ${error.message}`);
    }
}
module.exports = connectDB;