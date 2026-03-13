import { consumer } from "../config/kafka.js";
import { sendMail } from "../services/sendMail.js";
import { getEmailTemplate } from "../utils/emailTemplates.js";

export const consumeNotificationEvents = async () => {
  await consumer.subscribe({ topic: "notification-topic", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const payload = JSON.parse(message.value.toString());
        const { event, data } = payload;

        const mailOptions = getEmailTemplate(event, data);

        if (!mailOptions) {
          console.warn("Unknown event type:", event);
          return;
        }

        await sendMail({ to: data.email, ...mailOptions });
        console.log(`${event} email sent to`, data.email);

      } catch (err) {
        console.error("Kafka consumer error:", err);
      }
    },
  });
};