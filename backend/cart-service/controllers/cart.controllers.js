import Cart from "../models/cart.models.js";
import sendResponse from "../utils/sendResponse.js";


export const getCartItems = async (req, res) => {
    try {
      
        const cartItems = await Cart.find({userId:req.user.userId}).lean();
        return sendResponse(res, 200, true, "successfully fetched cart Items", cartItems);

    }
    catch (err) {
        console.log("failed to fetch cart items", err);
        return sendResponse(res, 500, false, " server error during cart items fetch!");
    }
}



export const addToCart = async (req, res) => {
    try {

        const { itemId } = req.params;
        const userId = req.user.userId;
        if (!itemId)
            return sendResponse(res, 400, false, "invalid item or quantity");

        const newCart = await Cart.create({ itemId, userId});
        console.log(newCart,"cart created");

        return sendResponse(res, 201, true, "new item added to the cart successfully!", { _id: newCart._id, itemId, quantity:1, userId});
    }
    catch (err) {
        console.log("failed to add new item to the card!", err);
        return sendResponse(res, 500, false, "failed to add new item t the card!");

    }
}


export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.userId;
        const itemId = req.params.itemId;
        
        const { quantity } = req.body;
        if (quantity <= 0) {
            return sendResponse(res, 400, false, "invalid quantity must be +ve");
        }

        const isExits = await Cart.findOne({ userId, itemId });
        if (isExits) {
            isExits.quantity = quantity;
            await isExits.save();
            return sendResponse(res, 200, true, "cart item updated successfully!");

        }
        return sendResponse(res, 400, false, "failed to update cart invalid item Id or item not found!");


    }
    catch (err) {

        console.log("error during update cart item", err);
        return sendResponse(res, 500, true, "server error");

    }
}



export const deleteCartItem = async (req, res) => {
    try {
        const userId = req.user.userId;

        const itemId = req.params.itemId;
        const isDel = await Cart.findByIdAndDelete({userId,itemId});
        if (isDel) {
            return sendResponse(res, 200, true, "cart item successfully deleted!");
        }
        return sendResponse(res, 400, false, "failed to delete cart item!");

    }
    catch (err) {

        console.log("error during item delete", err);
        return sendResponse(res, 500, true, "server err during cart deletion!");
    }
}


