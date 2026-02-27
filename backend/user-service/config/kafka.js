import { Kafka } from "kafkajs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const kafka = new Kafka({
  clientId: "my-producer",
  brokers: [
    "kafka-9ed6d9f-avansingh085-ed43.j.aivencloud.com:19099",
  ],
  ssl: {
    rejectUnauthorized: true,
    ca: [fs.readFileSync(path.join(__dirname, "ca.pem"), "utf-8")],
    cert: fs.readFileSync(path.join(__dirname, "service.cert"), "utf-8"),
    key: fs.readFileSync(path.join(__dirname, "service.key"), "utf-8"),
  },
});

const producer = kafka.producer();
const connectProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer Connected");
};




const consumer = kafka.consumer({
  groupId: "user-group",
});

const connectConsumer = async () => {
  await consumer.connect();
  console.log("Consumer connected");
};

export { producer, consumer, connectProducer, connectConsumer };
