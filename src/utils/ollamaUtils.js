import { Ollama } from "@langchain/community/llms/ollama";
import dotenv from 'dotenv';

dotenv.config();

export const getOllamaModel = () => {
  return new Ollama({
    baseUrl: process.env.OLLAMA_BASE_URL,
    model: process.env.OLLAMA_MODEL,
    temperature: 0.7,
  });
};
