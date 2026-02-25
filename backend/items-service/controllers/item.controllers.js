import mongoose from 'mongoose';
import Items from "../models/item.models.js";
import sendResponse from "../utils/sendResponse.js";
import { RedisGet, RedisSet } from '../config/redis.config.js';



export const addNewItem = async (req, res) => {

    try {
        const userId = req.user.userId;
        const { title, description, price, image , stock = 1 } = req.body;
        console.log(req.body);
        const newItem = await Items.create({ title, description, price, image, stock, userId });
        return sendResponse(res, 201, true, "newItem successfully created!", { title, description, price, stock, image });

    }
    catch (err) {
        console.log("failed to create new item!", err);
        return sendResponse(res, 500, false, "failed to create new item");

    }

}

export const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
      
        let isExistItem = await RedisGet(`item_by_id_${id}`);
      

        if(!isExistItem)
        {
        isExistItem=await Items.findById(id).lean();
    
        }
        if (isExistItem) {
           await  RedisSet(`item_by_id_${id}`,isExistItem);
            return sendResponse(res, 200, true, "item successfully fetched!", isExistItem);
        }
        return sendResponse(res, 400, false, "invalid item id or item not found!");
    }
    catch (err) {
        console.log("error during item fetch by Id", err);
        return sendResponse(res, 500, false, "server error");
    }
}

export const updateItem = async (req, res) => {

    try {
        const itemId = req.params.id;
        const isExistItem = await Items.findById(itemId);
        
        const { title, description, price, stock, image } = req.body;
        if (isExistItem) {
            isExistItem.title = title;
            isExistItem.description = description;
            isExistItem.price = price;
            isExistItem.stock = stock;
            isExistItem.image = image;
            await isExistItem.save();
             await  RedisSet(`item_by_id_${itemId}`,isExistItem);
            return sendResponse(res, 200, true, "item updated successfully!");
        }
        else {
            console.log("invalid itemId or item not found");
            return sendResponse(res, 401, false, "invalid itemId or item not found!");
        }


    }
    catch (err) {
        console.log("error during item update!", err);
        return sendResponse(res, 500, false, "server error during item update!");
    }

}

export const getListOfItem = async (req, res) => {
    try {
        console.log(req.query)
        const { start, limit } = req.query;
     
        if (start <= 0 || limit <= 0)
            return sendResponse(res, 401, false, "invalid query start limit must be +ve");
        const listOfItems = await Items.find().skip(start - 1).limit(limit);
        return sendResponse(res, 200, true, "items fetched successfully!", listOfItems);

    }
    catch (err) {
        console.log("error during listofItem fetch!", err);
        return sendResponse(res, 500, false, "server error");

    }
}

export const deleteItem = async (req, res) => {
    try {
        const itemId = req.query.id;
        const isDel = await Items.findByIdAndDelete(itemId);
        
        if (isDel) {
            await RedisSet(`item_by_id_${itemId}`,null)
            console.log("item successfully deleted");
            return sendResponse(res, 200, true, "item successfully deleted");
        }
        else {
            console.log("failed to delete item or invalid itemId");
            return sendResponse(res, 400, false, "failed to delete item or invalid item id");
        }
    }
    catch (err) {
        console.log("error during item delete", err);
        return sendResponse(res, 500, false, "server error during delete item");
    }
}


const reserveOrder=async (req,res)=>{
    try{
        

    }catch(err){

    }
}