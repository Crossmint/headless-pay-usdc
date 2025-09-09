import * as dotenv from "dotenv";
dotenv.config();

export const API_URL = process.env.CROSSMINT_API_URL || "https://staging.crossmint.com";
export const API_KEY = process.env.CROSSMINT_API_KEY!;
export const COLLECTION_ID = process.env.COLLECTION_ID;
export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
export const PAYER_ADDRESS = process.env.PAYER_ADDRESS;