import { consumer } from "../config/kafka.js";

export const consumeItemEvents = async () => {


  await consumer.subscribe({
    topic: "payment-topic",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());

      console.log("Payment event received:", data);

      // if (data.event === "ITEM_CREATED") {

      // }

      // if (data.event === "ITEM_UPDATED") {

      // }
    },
  });
};