import apiClient from "./apiClient.js";

export const addToCart=async (id)=>{

    try{
        const response=await apiClient.post(`/carts/${id}`);
        return response.data;
    }
    catch(err){
        console.log("failed to add data to cart ",err);
        return {success:false,message:"failed to add cart item"};
    }

}

export const updateCart=async (id,data)=>{
    
         try{
        const response=await apiClient.patch(`/carts/${id}`,data);
        return response.data;
    }
    catch(err){
        console.log("failed to update data to cart ",err);
        return {success:false,message:"failed to update cart item"};
    }
   
}

export const deleteCart=async (id)=>{
     try{
        const response=await apiClient.delete(`/carts/${id}`);
        return response.data;
    }
    catch(err){
        console.log("failed to delete data to cart ",err);
        return {success:false,message:"failed to delete cart item"};
    }
}

export const getCartItems=async (start,limit)=>{
     try{
        const response=await apiClient.get(`/carts?start=${start}&limit=${limit}`);
        return response.data;
    }
    catch(err){
        console.log("failed to add data to cart ",err);
        return {success:false,message:"failed to add cart item"};
    }
}