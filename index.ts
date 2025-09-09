import { createOrder } from "./createOrder";
import { pollOrder } from "./getOrder";

async function main() {
    try {
        console.log("Creating order...");
        const { order } = await createOrder();
        console.log(`Order ID: ${order.orderId}`);
        
        if (order.phase !== "payment") {
            throw new Error(`Order is in phase "${order.phase}". Expected "payment".`);
        }

        const payment = order.payment
        if (payment.status !== "awaiting-payment") {
            throw new Error(`Payment is in status "${payment.status}". Expected "awaiting-payment".`);
        }
        const serializedTransaction = payment.preparation.serializedTransaction;
        console.log(`Copy and paste this string to the next step of the quickstart: \x1b[34m${serializedTransaction}\x1b[0m`);

        const orderId = order.orderId;

        const completedOrder = await pollOrder(orderId)
        console.log("Here is the final order details");
        console.log(JSON.stringify(completedOrder, null, 2));
    } catch (error) {
        console.error(error);
    }
}

main();