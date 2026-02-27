import { producer } from "../config/kafka.js";



export const sendNotificationEvent = async (event, data) => {
  try {

    console.log(event, data)
    await producer.send({
      topic: "notification-topic",
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

    console.log("notification event sent");
  } catch (err) {
    console.error("Kafka Producer Error:", err);
  }
};

