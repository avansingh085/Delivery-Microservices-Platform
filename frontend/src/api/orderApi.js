import apiClient from "./apiClient"
export const getOrders=async ()=>{
    try{
             const response=await apiClient.get("/orders");
             return response.data;
    }catch(err){

        console.log("failed ot fetch orders ",err);
        return {success:false,message:"failed to fetch order data"};
    }
}


export const createOrder=async (order)=>{
    try{

        const response=await apiClient.post("/orders",order)
        return response.data;

    }catch(err){
         console.log("failed to create order",err);
         return {success:false,message:"failed to create order"};
    }
}