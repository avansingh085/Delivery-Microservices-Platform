import { producer } from "../config/kafka.js";

export const sendMessage = async (topic, data) => {
  try {
    await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(data),
        },
      ],
    });

    console.log(`Message sent to topic: ${topic}`);
  } catch (error) {
    console.error("Kafka Send Error:", error);
  }
};
