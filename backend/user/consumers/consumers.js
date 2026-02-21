import { consumer } from "../config/kafka.js";

export const startConsumer = async () => {
  try {
    await consumer.connect();

    await consumer.subscribe({
      topic: "cart-topic",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value.toString();

        console.log("Received message:");
        console.log({
          topic,
          partition,
          value,
        });
        try {
          const parsedData = JSON.parse(value);
          console.log("Parsed Data:", parsedData);
        } catch (err) {
          console.log("Message is not JSON");
        }
      },
    });

  } catch (error) {
    console.error("Consumer error:", error);
  }
};
