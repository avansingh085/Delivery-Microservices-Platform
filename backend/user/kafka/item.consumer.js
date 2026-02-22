import { consumer, producer } from "../config/kafka.js";
import { sendNotificationEvent } from "./item.producer.js";
import  User from '../models/user.models.js';
export const consumeUserEvents = async () => {
 

  await consumer.subscribe({
    topic: "user-topic",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());
      console.log("notification event received:", data);
      
      const {events,userId}=data;
      const user=await User.findById(userId);
      
      sendNotificationEvent(data.events,{email:user.email,userId});
    },
  });
};