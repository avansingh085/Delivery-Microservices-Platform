import apiClient from "./apiClient.js";

export const sendOtp = async (email) => {
    try {
        console.log(`Sending OTP to: ${email}`);
        const response = await apiClient.post('/users/auth/send-otp', { email });
        return { ...response.data, success: true };
    } catch (err) {
        console.error("Send OTP Error:", err);
        return { message: err.response?.data?.message || err.message, success: false };
    }
};

export const verifyOtp = async (email, otp) => {
    try {
        const response = await apiClient.post('/users/auth/verify-otp', { email, otp });
        return { ...response.data, success: true };
    } catch (err) {
        console.error("Verify OTP Error:", err);
        return { message: err.response?.data?.message || err.message, success: false };
    }
};

export const register = async (data) => {
    try {
        const response = await apiClient.post('/users/auth/register', data);
        return { ...response.data, success: true };
    } catch (err) {
        console.error("Registration Error:", err);
        return { message: err.response?.data?.message || err.message, success: false };
    }
};

export const login = async (data) => {
    try {
        const response = await apiClient.post('/users/auth/login', data);
        console.log(response,"auth");
        return { ...response.data, success: true };
    } catch (err) {
        console.error("Login Error:", err);
       
        return { message: err.response?.data?.message || err.message, success: false };
    }
};