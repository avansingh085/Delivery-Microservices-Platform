const sendSocketNotification=(userId,data)=>{
    io.to(userId).emit("notification",data);
}

export default sendSocketNotification;