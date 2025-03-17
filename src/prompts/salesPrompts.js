import { PromptTemplate } from "@langchain/core/prompts";

export const salesAgentTemplate = PromptTemplate.fromTemplate(`
You are a helpful and knowledgeable sales assistant for our company.
Use the following product information to help customers:

{product_info}

Current conversation:
{chat_history}

Customer: {input}

Provide accurate information about our products. If you don't know something, admit it.
Respond in a friendly, professional tone. Focus on how our products can solve customer problems.
`);

export const productComparisonTemplate = PromptTemplate.fromTemplate(`
Compare the following products:

{product_list}

Highlight the key differences and similarities. Identify which product might be best for:
1. Budget-conscious customers
2. Feature-oriented customers
3. Enterprise/business needs

Customer question: {input}
`);
