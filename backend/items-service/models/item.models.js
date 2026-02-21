import mongoose from 'mongoose';

const itemSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    offer:{
        type:Number,
        min:0,
        default:0
    },
    stock:{
        type:Number,
        required:true,
        min:0,

    },
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    }
})

const Items=mongoose.model('items',itemSchema);
export default Items;