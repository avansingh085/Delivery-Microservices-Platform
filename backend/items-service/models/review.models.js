import mongoose from 'mongoose';

const reviewSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
    }
    ,
    star:{
        type:Number,
        required:true,
        min:0,
        max:5
    },
    comment:{
        type:String,
        default:""
    },
    images:[]
})

const Reviews=mongoose.model('reviews',reviewSchema);
export default Reviews;