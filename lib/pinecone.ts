import { Pinecone } from '@pinecone-database/pinecone';

// Ensure the API key exists
const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
  throw new Error('PINECONE_API_KEY is not defined in .env.local');
}

const pinecone = new Pinecone({
  apiKey: apiKey,
});

export const getPineconeClient = () => {
  return pinecone;
};
