import mongoose from 'mongoose';
import { MONGO_URI } from './server.config.js';
const connectDB=async ()=>{
    try{
        await  mongoose.connect(MONGO_URI);
        console.log("database successfully connected !");
    }
    catch(err){
        console.log("failed to connect database",err);

    }
}

export default connectDB;