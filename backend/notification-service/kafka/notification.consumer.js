import { consumer } from "../config/kafka.js";

import { sendMail } from "../services/sendMail.js";


export const consumeNotificationEvents = async () => {

  await consumer.subscribe({
    topic: "notification-topic",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {

        const payload = JSON.parse(message.value.toString());
        console.log("Order event received:", payload);
        const { email } = payload;

        if (payload.event === "ORDER_SUCCESS") {

          sendMail(email,)

        }


      } catch (err) {
        console.error("Kafka consumer error:", err);
      }
    },
  });
};