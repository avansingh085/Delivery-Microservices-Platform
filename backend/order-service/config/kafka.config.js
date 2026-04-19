import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer Connected");
};

const consumer = kafka.consumer({
  groupId: "cart-group",
});

const connectConsumer = async () => {
  await consumer.connect();
  console.log("Consumer connected");
};

export { producer, consumer, connectProducer, connectConsumer };