import orderModel from "../models/order.model.js";
import sendResponse from "../utils/sendResponse.js";

export const createOrder=async (req,res)=>{
    try{
          const {itemId,quantity,price}=req.body;
          const userId=req.user.userId;
          if(!itemId||!quantity||!price||!userId)
            return sendResponse(res,400,false,"invalid order data!");
          const newOrder=await orderModel.create({itemId,quantity,price,userId});


          return sendResponse(res,200,true,"order successfully created ");
        
    }
    catch(err){
        console.log("internal server err",err);
        return sendResponse(res,500,false,"internal server error");

    }
}

export const updateStatus=async (req,res)=>{
    try{
             const {itemId}=req.params;
             const {status}=req.body;
             const isUpdate=await orderModel.findByIdAndUpdate(itemId,{status});
             if(isUpdate)
             {
                return sendResponse(res,200,true,"successfully update order status");
             }
             return sendResponse(res,400,false,"failed to update invalid order detail");
    }
    catch(err){
           console.log("internal server err",err);
        return sendResponse(res,500,false,"internal server error");

    }

}

export const getOrders=async (req,res)=>{
    try{
        const {start,limit}=req.query;
        const {userId}=req.user;
        if(start<=0||!start||!limit||limit<=0||!userId)
            return sendResponse(res,400,false,"client error");
        const allOrders=await orderModel.find({userId}).skip((start-1)*limit).limit(limit).lean();
        return sendResponse(res,200,true,"successfully fetched data",allOrders)



    }
    catch(err){
        console.log("server error",err);
        return sendResponse(res,500,true,"server err");

    }
}