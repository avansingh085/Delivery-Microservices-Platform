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
    deliveryPartnerId:{
       type: mongoose.Schema.Types.ObjectId,
      ref: "deliveryPartner",  
      default:null
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
    paymentId:{
      type:String,
      required:true
    },
    paymentStatus:{
      type:String,
      default:"pending"

    },
    status: {
    type: String,
    enum: [
      "pending",
      "accepted",
      "preparing",
      "picked",
      "on_the_way",
      "delivered",
      "cancelled"
    ],
    default: "pending"
  },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
