import { Error, Success } from "../utils/toast.jsx";
import { toast } from "react-toastify";
import apiClient from "./apiClient.js";
export const getItems = async (start = 1, limit = 20) => {
    try {
        const response = await apiClient.get(`/items/?start=${start}&limit=${limit}`);
        toast.success(response.data.message);
        return response.data;
    }
    catch (err) {
        console.log("failed to fetch data!", err);
        toast.error(err.message)
        return { success: false, message: "failed to fetch data" };

    }
}
export const addItem = async (data) => {
    try {
        const response = await apiClient.post("/items", data);

        return response.data;

    }
    catch (err) {
        console.log("failed to add new item", err);
        return { success: false, message: "failed to add new item" };
    }
}

export const updateItem = async (id, data) => {
    try {
        console.log(id, data);
        const response = await apiClient.patch(`/items/${id}`, data);
        Success(response.data.message);
        return response.data;
    } catch (err) {

        console.log("failed to update items", err);
        Error(err);
        return { success: false, message: "failed to update item" };

    }
}

export const deleteItem = async (id) => {
    try {

        const response = await apiClient.delete(`/items/${id}`);
        Success(response.data.message);
        return response.data;

    }
    catch (err) {
        console.log("failed to delete item", err);
        Error(err);
        return { success: false, message: "failed to delete item" };
    }
}

export const getItemById=async (id)=>{
    try{
        const response=await apiClient.get(`/items/${id}`);
        return {...response.data};

    }catch(err){
        console.log("failed to fetch item",err);
        return {success:false,message:"failed to fetch item"};
    }
}