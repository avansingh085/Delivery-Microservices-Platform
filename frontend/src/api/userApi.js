import apiClient from "./apiClient.js";

export const profile = async () => {
    try {

        const response = await apiClient.get('/users');
        console.log(response,"HHHHHH");
        return { message: 'fetched successfully profile', success: true,data:response.data.data };

    } catch (err) {

        console.log("error during fetch profile data", err);
        return { message: "failed to fetch profile data", success: false };

    }
}

export const updateProfile=async (data)=>{
    try{
           const response=await apiClient.patch("/users",data);
           console.log(response);
           return {...response.data};
    }
    catch(err){
        console.log("error during profile update",err);
        return {message:"failed  to update profile",success:false};

    }
}
