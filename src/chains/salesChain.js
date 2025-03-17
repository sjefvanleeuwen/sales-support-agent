import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { PromptTemplate } from "@langchain/core/prompts";
import { getAllProducts, getProductByName } from "../data/productData.js";
import dotenv from 'dotenv';

dotenv.config();

// Get verbose setting from environment variable
const verboseOutput = process.env.TRACE_OUTPUT?.toLowerCase() === 'true';

export const createSalesChain = (llm) => {
  // Format product info once for the entire conversation
  const products = getAllProducts();
  const productInfo = products.map(p => 
    `Product: ${p.name}\nPrice: $${p.price}\nDescription: ${p.description}\nFeatures: ${p.features.join(", ")}\nStock: ${p.availableStock}`
  ).join("\n\n");

  // Create a completely new template with hardcoded product info
  const completeTemplate = `
You are a helpful and knowledgeable sales assistant for our company.
Use the following product information to help customers:

${productInfo}

Current conversation:
{chat_history}

Customer: {input}

Provide accurate information about our products. If you don't know something, admit it.
Respond in a friendly, professional tone. Focus on how our products can solve customer problems.
`;

  // Create template from the complete string with hardcoded product info
  const finalPrompt = new PromptTemplate({
    template: completeTemplate,
    inputVariables: ["input", "chat_history"],
  });

  const memory = new BufferMemory({ 
    returnMessages: true, 
    memoryKey: "chat_history" 
  });

  return new ConversationChain({
    llm,
    memory,
    prompt: finalPrompt,
    verbose: verboseOutput
  });
};

export const createProductComparisonChain = (llm, productNames) => {
  const productList = productNames.map(name => {
    const product = getProductByName(name);
    if (!product) return `Product "${name}" not found`;
    
    return `Product: ${product.name}\nPrice: $${product.price}\nDescription: ${product.description}\nFeatures: ${product.features.join(", ")}`;
  }).join("\n\n");

  // Create a complete template with the product list hardcoded
  const completeTemplate = `
Compare the following products:

${productList}

Highlight the key differences and similarities. Identify which product might be best for:
1. Budget-conscious customers
2. Feature-oriented customers
3. Enterprise/business needs

Customer question: {input}
`;

  // Create template from complete string with hardcoded product list
  const finalPrompt = new PromptTemplate({
    template: completeTemplate,
    inputVariables: ["input"],
  });

  return new ConversationChain({
    llm,
    prompt: finalPrompt,
    verbose: verboseOutput
  });
};
