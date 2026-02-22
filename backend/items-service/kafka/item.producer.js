import { producer } from "../config/kafka.js";

export const sendNotificationEvent = async (event, data) => {
  try {
   
    await producer.send({
      topic: "notification-events",
      messages: [
        {
          value: JSON.stringify({
            event,
            data,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    });

    console.log("Item event sent");
  } catch (err) {
    console.error("Kafka Producer Error:", err);
  }
};