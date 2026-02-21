import { consumer } from "../config/kafka.js";


export const startNotificationConsumer = async () => {
  try {
    
    await consumer.subscribe({
      topic: "notification-topic",
      fromBeginning: false,
    });

    console.log("✅ Subscribed to notification topic");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
       

          console.log("📩 Received message:", message);

       
        } catch (error) {
          console.error("❌ Error processing message:", error);
        }
      },
    });
  } catch (error) {
    console.error("❌ Consumer error:", error);
  }
};
