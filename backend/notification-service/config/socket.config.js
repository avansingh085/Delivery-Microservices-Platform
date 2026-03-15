import {Server} from "socket.io";
import socketAuth from "../middlewares/socketAuth.middleware";

let io;

const initSocket=(server)=>{
    io=new Server(server,{
       origin:"",
       credentials:true 
    })
    io.use(socketAuth);

    io.on("connection",(socket)=>{
        const userId=socket.user.id;

        console.log("User connected",userId);

        socket.join(userId);

        socket.on("disconnect",()=>{
            console.log("User disconnected",userId);

        })
    })
}

export const getSocketIO=()=>io;




export default initSocket;