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
        console.log("Event received:", payload);

        const { event, data } = payload;

        switch (event) {
          case "ORDER_SUCCESS":
            await sendMail({
              to: data.email,
              subject: `Your order ${data?.orderId} was successful!`,
              text: `Hi, your order ${data?.orderId} has been placed successfully.`,
              html: `<p>Hi,</p><p>Your order <strong>${data?.orderId}</strong> has been placed successfully.</p>`,
            });
            console.log("Order email sent to", data.email);
            break;

          case "OTP_VERIFICATION":
            await sendMail({
              to: data.email,
              subject: "Your OTP Code",
              text: `Your OTP code is: ${data.otp}`,
              html: `<p>Your OTP code is: <strong>${data.otp}</strong></p>`,
            });
            console.log("OTP email sent to", data.email);
            break;

          case "GENERAL_NOTIFICATION":
            await sendMail({
              to: data.email,
              subject: data.subject || "Notification",
              text: data.message,
              html: `<p>${data.message}</p>`,
            });
            console.log("Notification email sent to", data.email);
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