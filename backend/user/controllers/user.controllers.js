import { RedisGet, RedisSet } from '../config/redis.config.js';
import User from '../models/user.models.js';
import sendResponse from '../utils/sendResponce.js';

export const profile = async (req, res, next) => {
    try {
        let user = await RedisGet(`profile_by_id_${req.user.userId}`)
       
        if (!user)
            user = await User.findById(req.user.userId);

        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            location: user.location,
            id: user._id

        }
        await RedisSet(`profile_by_id_${req.user.userId}`, data)
        return sendResponse(res, 200, true, "fetched profile successfully!", data);

    }
    catch (err) {
        console.log(err, "failed to fetch profile data");
        next(err);
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        const { firstName, lastName, phone, location } = req.body;
        const userId = req.user.userId;
        const user = await User.findById(userId);
        user.firstName = firstName;
        user.lastName = lastName;
        user.phone = phone;
        user.location = location;
        await user.save();
         const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            location: user.location,
            id: user._id

        }
        await RedisSet(`profile_by_id_${req.user.userId}`, data)
        return sendResponse(res, 200, true, "user profile successfully updated!");
    }
    catch (err) {
        console.log("failed to update user profile", err);
        next(err);

    }
}
