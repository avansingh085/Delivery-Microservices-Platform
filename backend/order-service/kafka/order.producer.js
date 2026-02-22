import { producer } from "../config/kafka.config.js";

export const sendEvent = async (topic, event, data) => {
  try {
    await producer.send({
      topic,
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

    console.log(`${topic} event sent`);
  } catch (err) {
    console.error("Kafka Producer Error:", err);
  }
};