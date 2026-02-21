import { toast } from "react-toastify"


export const Error=(err)=>{
     const message =
    err.response?.data?.message || err.message || "Server Error";
    
  toast.error(message);
   

}

export const Success=(message)=>{
    toast.success(message)
}