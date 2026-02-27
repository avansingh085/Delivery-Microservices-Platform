import { consumer } from "../config/kafka.js";
import { sendNotificationEvent } from "./user.producer.js";
import User from "../models/user.model.js";

export const consumeUserEvents = async () => {
  await consumer.subscribe({
    topic: "user-topic",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const data = JSON.parse(message.value.toString());
        console.log("User event received:", data);

        const user = await User.findById(data.data.userId);
        if (!user) {
          console.warn("User not found for ID:", data.data.userId);
          return;
        }


        await sendNotificationEvent(data.event, { email: user.email, userId: user._id });

      } catch (err) {
        console.error("Error processing user event:", err);
      }
    },
  });
};