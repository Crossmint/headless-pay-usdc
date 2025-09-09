import { API_KEY, API_URL, COLLECTION_ID, EMAIL_ADDRESS, PAYER_ADDRESS } from "./utils";


export async function createOrder() {
    const payload = {
        recipient: {
            email: EMAIL_ADDRESS, // Replace with actual recipient wallet address
        },
        payment: {
            method: "base-sepolia",
            currency: "usdc",
            payerAddress: PAYER_ADDRESS,
        },
        lineItems: [
            {
                collectionLocator: `crossmint:${COLLECTION_ID}`
            },
        ],
    };
    const response = await fetch(`${API_URL}/api/2022-06-09/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`Failed to create order: ${response.status} ${response.statusText}`);
    }
    const jsonResponse = await response.json();
    return { 
        "clientSecret": jsonResponse["clientSecret"], // Used for order authentication
        "order": jsonResponse["order"] // Contains the order details
    }
}