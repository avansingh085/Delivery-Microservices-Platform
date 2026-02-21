import mongoose from 'mongoose';
import { MONGO_URI } from './server.config.js';

const connectDB=async ()=>{
    try{
       await mongoose.connect(MONGO_URI);
       console.log("database connected successfully!");
    }
    catch(err){
        console.log("failed to connect database");
    }
}

export default connectDB;