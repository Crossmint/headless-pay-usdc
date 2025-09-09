import { API_KEY, API_URL, COLLECTION_ID, EMAIL_ADDRESS, PAYER_ADDRESS } from "./utils";


export async function createOrder() {
    const response = await fetch(`${API_URL}/api/2022-06-09/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
        },
        body: JSON.stringify({
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
                    collectionLocator: `crossmint:${COLLECTION_ID}`,
                    callData: {
                        quantity: 1,
                    }
                },
            ],

        }),
    });
    const json_response = await response.json();
    return { "clientSecret": json_response["clientSecret"], "order": json_response["order"] }
}