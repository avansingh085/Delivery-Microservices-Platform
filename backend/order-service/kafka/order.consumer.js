import { consumer } from "../config/kafka.config.js";
import orderModel from "../models/order.model.js";
import { sendEvent } from "./order.producer.js";

export const consumeOrderEvents = async () => {

  await consumer.subscribe({
    topic: "order-topic",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const payload = JSON.parse(message.value.toString());
        console.log("Order event received:", payload);

        if (payload.event === "CREATE_ORDER") {

          const { userId, paymentId, items, } = payload.data;

          const orders = items.map((item) => ({
            userId,
            itemId: item.itemId,
            quantity: item.quantity,
            price: item.price,
            paymentId,
            paymentStatus: "SUCCESS",
            orderStatus: "accepted"
          }));

          await orderModel.insertMany(orders);

          console.log("Orders created");
          await sendEvent("cart-topic", "DELETE_CART", {
            userId,
            cartIds: items.map(i => i.cartId)
          });

          // for notification
          await sendEvent("user-topic", "ORDER_SUCCESS", {
            userId,
            paymentId
          })

          await sendEvent("item-topic", "UPDATE_ITEM_STOCK", { items });

        }

      } catch (err) {
        console.error("Kafka consumer error:", err);
      }
    },
  });
};