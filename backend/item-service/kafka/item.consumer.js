import { consumer } from "../config/kafka.js";
import Items from "../models/item.model.js";
export const consumeItemEvents = async () => {


  await consumer.subscribe({
    topic: "item-topic",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());

      console.log("Item event received:", data);



      if (data.event === "UPDATE_ITEM_STOCK") {

        const { items } = data.data;

        for (const item of items) {

          await Items.updateOne(
            { _id: item.itemId },
            { $inc: { stock: -item.quantity } }
          );

        }

      }


    },
  });
};