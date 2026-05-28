import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY!;

export const pinecone = new Pinecone({ apiKey });

export const INDEX_NAME = "vitaone";
