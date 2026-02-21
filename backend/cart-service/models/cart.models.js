import mongoose from 'mongoose';

const cartSchema=new mongoose.Schema({
    itemId:{
        type:mongoose.Types.ObjectId,
        required:true,
        unique:true
    },
    quantity:{
        type:Number,
        min:1,
        default:1
    },
    userId:{
        type:mongoose.Types.ObjectId,
        reuired:true,
    }
})

const Cart=mongoose.model('Cart',cartSchema);

export default Cart;