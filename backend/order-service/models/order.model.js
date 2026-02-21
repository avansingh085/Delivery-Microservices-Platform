import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",  
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,  
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    status:{
        type:String,
        default:"pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
