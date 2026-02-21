import {producer} from '../config/kafka.js';

export const connectProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer Connected");
};
export async function produceMessages() {
    try {
        await producer.connect();
        console.log("✅ Producer connected");

        for (let i = 1; i <= 10; i++) {
            const message = `Hello from Node using SSL ${i}!`;

            await producer.send({
                topic: "cart-topic",
                messages: [{ value: message }],
            });

            console.log("Message sent:", message);
            await new Promise((res) => setTimeout(res, 1000));
        }

        await producer.disconnect();
        console.log("✅ Producer disconnected");
    } catch (error) {
        console.error("❌ Error:", error);
    }
}
produceMessages()
export default produceMessages;
