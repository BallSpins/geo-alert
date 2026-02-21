import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_GEMINI_API_KEY;

export const client = new GoogleGenAI({
  apiKey,
});

const listModels = async () => {
  const models = await client.models.list();
  console.log(models);
};

listModels();