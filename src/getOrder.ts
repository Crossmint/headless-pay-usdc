import { API_KEY, API_URL } from "./utils";


export async function getOrder(orderId: string) {
    const response = await fetch(`${API_URL}/api/2022-06-09/orders/${orderId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
        }
    });
    const json_response = await response.json();
    return json_response;
}

export async function pollOrder(orderId: string) {
    while (true) {
        const order = await getOrder(orderId);
        console.log(`Current order status: \x1b[33m${order.phase}\x1b[0m`);
        if (order.phase === "completed") {
            return order;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}