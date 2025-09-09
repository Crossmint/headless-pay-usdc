import { API_KEY, API_URL } from "./utils";

export async function getOrder(orderId: string) {
    const response = await fetch(`${API_URL}/api/2022-06-09/orders/${orderId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY, // API authentication
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to get order: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

export async function pollOrder(orderId: string) {
    while (true) {
        const order = await getOrder(orderId);
        console.log(`Current order status: \x1b[33m${order.phase}\x1b[0m`);
        if (order.phase === "completed") {
            return order;
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
}