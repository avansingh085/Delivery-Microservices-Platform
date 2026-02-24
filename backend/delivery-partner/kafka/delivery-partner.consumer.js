import { consumer } from "../config/kafka.js";
import { sendMail } from "../services/sendMail.js";

export const consumeNotificationEvents = async () => {
  await consumer.subscribe({
    topic: "delivery-partner-topic",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const payload = JSON.parse(message.value.toString());
        console.log("Event received:", payload);

        const { event, data } = payload;

        switch (event) {
          case "ASSIGN_DELIVERY_PARTNER":
           
            break;

          case "OTP_VERIFICATION":
           
            break;

          case "GENERAL_NOTIFICATION":
           
            break;
    

          default:
            console.warn("Unknown event type:", event);
        }

      } catch (err) {
        console.error("Kafka consumer error:", err);
      }
    },
  });
};