import { consumer } from "../config/kafka.js";
import Cart from "../models/cart.model.js";

export const consumeCartEvents = async () => {

  await consumer.subscribe({
    topic: "cart-topic",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const payload = JSON.parse(message.value.toString());

        console.log("Cart event:", payload);

        if (payload.event === "DELETE_CART") {

          const { userId, cartIds } = payload.data;


          await Cart.deleteMany({
            _id: { $in: cartIds },
            userId: userId
          });

          console.log("Cart items deleted:", cartIds);
        }

      } catch (err) {
        console.error("Cart consumer error:", err);
      }
    },
  });
};