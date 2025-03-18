# EV Charging Solutions Sales Support Agent

An AI-powered sales support agent built with JavaScript, LangChain, and Ollama that helps customers with electric vehicle charging solutions.

## Overview

This project creates an interactive command-line sales assistant for an EV charging equipment provider. The agent can:

- Provide detailed information about various EV charging stations and their specifications
- Compare different charging solutions when requested (e.g., comparing home vs commercial chargers)
- Answer technical questions about installation requirements and compatibility
- Recommend products based on customer needs and electrical setup
- Maintain context throughout the conversation

## Requirements

- Node.js (v14.0.0 or higher)
- npm or yarn
- Ollama installed locally with models available

## Installation

1. Clone this repository:
   ```
   git clone <repository-url>
   cd sales-support-agent
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Make sure Ollama is installed and running locally:
   ```
   ollama run llama3
   ```

## Configuration

The application uses an `.env` file for configuration:

- `OLLAMA_BASE_URL`: The URL where your Ollama instance is running (default: http://localhost:11434)
- `OLLAMA_MODEL`: The model to use with Ollama (default: llama3.2:3b)
- `TRACE_OUTPUT`: Set to "true" to enable verbose debugging output, "false" for clean conversation view

## Usage

1. Start the application:
   ```
   npm start
   ```

2. Interact with the sales agent through the command line interface.
   - Ask questions about EV charging products
   - Request product comparisons
   - Type 'exit' to quit

Example queries:
- "Tell me about the HomeCharge 7kW"
- "Compare the PowerFlex 11kW with the CommercialPro 22kW"
- "What's the best charger for home use?"
- "Which charger is compatible with my Tesla?"
- "What installation requirements are needed for the RapidDC 50kW?"

## Product Catalog

Our sales agent has knowledge of various EV charging products including:
- Home charging solutions (3.7kW to 7kW)
- Advanced smart chargers with app control
- Commercial charging stations for businesses and public locations
- DC fast charging solutions for rapid charging
- Portable charging options

Our products vary in:
- Power output (3.7kW to 50kW)
- Amperage and phase configurations
- Installation requirements
- Smart features and connectivity
- Charging speed capabilities

## Project Structure

```
sales-support-agent/
├── .env                       # Environment variables
├── package.json               # Project dependencies
├── src/
│   ├── agents/
│   │   └── salesAgent.js      # Main agent implementation
│   ├── chains/
│   │   └── salesChain.js      # LangChain chains for different functionalities
│   ├── data/
│   │   └── productData.js     # Product catalog and data utilities
│   ├── prompts/
│   │   └── salesPrompts.js    # Prompt templates for the LLM
│   ├── utils/
│   │   └── ollamaUtils.js     # Ollama configuration utilities
│   └── index.js               # Application entry point
```

## Building a LangChain Agent for Sales Support

### How to Build a LangChain Agent for a Sales and Support Company

To build a LangChain agent like ours for sales and support, follow these steps:

1. **Define the business domain and product catalog**
   - Create a structured database/JSON of products with detailed specifications
   - Organize products by categories, features, and use cases
   - Include pricing, availability, and technical details

2. **Select the right LLM and tools**
   - Choose an appropriate LLM (we used Ollama with llama3)
   - Set up LangChain integration with the LLM
   - Configure memory components for conversation history

3. **Design specialized prompts**
   - Create base prompts for general product information
   - Design specialized prompts for product comparisons
   - Include company voice/tone in prompt engineering

4. **Build the agent architecture**
   - Implement a main agent class to manage interactions
   - Create specialized chains for different query types
   - Add routing logic to direct queries to appropriate chains

5. **Implement memory and context retention**
   - Use BufferMemory to maintain conversation history
   - Pass contextual information between different interactions
   - Ensure product information is available throughout the conversation

6. **Add specialized handling for common queries**
   - Implement product comparison functionality
   - Create recommendation logic based on customer needs
   - Handle technical support queries

7. **Test and iterate**
   - Test with various customer scenarios
   - Refine prompts based on response quality
   - Optimize routing logic for better query understanding

## Technical Deep Dive: Product Comparison Chain

The product comparison functionality is one of the most powerful features of our sales agent. Here's a detailed look at how it works:

### How Product Comparison Works

1. **Query Detection**
   - The `SalesSupportAgent` class analyzes each user input for comparison-related keywords
   - Keywords like "compare", "difference", "vs", "versus" trigger the comparison chain
   - This pattern matching approach ensures users don't need to use exact commands

2. **Product Entity Extraction**
   - Once a comparison intent is detected, the agent scans for product names in the query
   - It uses a simple but effective matching algorithm that checks if product names from our catalog appear in the user's query
   - Partial matches are supported, allowing users to refer to products in natural ways

3. **Dynamic Prompt Construction**
   - The system dynamically builds a specialized prompt containing only the relevant products
   - Each product's details (name, price, description, features) are formatted for easy comparison
   - The hardcoded template ensures consistent output formatting

4. **Side-by-Side Analysis**
   - The LLM processes the specialized prompt to generate a detailed comparison
   - The comparison highlights key differences in:
     - Price points and value proposition
     - Power output and charging speeds
     - Installation requirements
     - Special features and target use cases

### Technical Implementation

```javascript
async handleProductComparison(userInput) {
  // Extract product names mentioned in the user input
  const mentionedProducts = this.productNames.filter(name => 
    userInput.toLowerCase().includes(name.toLowerCase())
  );
  
  // Fall back to general sales chain if fewer than 2 products are mentioned
  if (mentionedProducts.length < 2) {
    return await this.salesChain.call({
      input: userInput
    }).then(res => res.response);
  }
  
  // Create a specialized comparison chain with just the mentioned products
  const comparisonChain = createProductComparisonChain(this.llm, mentionedProducts);
  const response = await comparisonChain.call({
    input: userInput
  });
  
  return response.comparison;
}
```

The `createProductComparisonChain` function:

```javascript
export const createProductComparisonChain = (llm, productNames) => {
  // Fetch and format detailed information about each product
  const productList = productNames.map(name => {
    const product = getProductByName(name);
    if (!product) return `Product "${name}" not found`;
    
    return `Product: ${product.name}\nPrice: $${product.price}\nDescription: ${product.description}\nFeatures: ${product.features.join(", ")}`;
  }).join("\n\n");

  // Create a template with the product information directly embedded
  const completeTemplate = `
Compare the following products:

${productList}

Highlight the key differences and similarities. Identify which product might be best for:
1. Budget-conscious customers
2. Feature-oriented customers
3. Enterprise/business needs

Customer question: {input}
`;

  // Create a prompt template with the product data hardcoded
  const finalPrompt = new PromptTemplate({
    template: completeTemplate,
    inputVariables: ["input"],
  });

  // Create the chain with minimal verbosity based on environment setting
  return new ConversationChain({
    llm,
    prompt: finalPrompt,
    verbose: verboseOutput
  });
};
```

### Benefits of This Approach

1. **Precision**: By focusing only on the products mentioned, the agent provides more relevant and concise comparisons.

2. **Efficiency**: Dynamically creating a specialized chain avoids confusion that might occur if all products were included in every prompt.

3. **Clarity**: The structured output format helps customers understand key differences at a glance.

4. **Adaptability**: The comparison can handle any combination of products from our catalog, even when customers request unusual comparisons (like comparing a home charger to a commercial one).

5. **Contextual Understanding**: By including the original customer question in the prompt, the comparison focuses on aspects most relevant to the customer's needs.

This specialized comparison functionality demonstrates how LangChain can be used to create domain-specific reasoning chains that enhance the overall capabilities of an AI sales assistant.

### Agent Architecture Diagram

```
┌─────────────────────────────────┐
│       User Query Input          │
└───────────────┬─────────────────┘
                │
┌───────────────▼─────────────────┐
│     Sales Support Agent         │
│  (Query Analysis & Routing)     │
└─┬─────────────────────────────┬─┘
  │                             │
┌─▼──────────────┐    ┌─────────▼────────┐
│  Sales Chain   │    │ Comparison Chain │
│ (Product Info) │    │ (Product vs      │
└─┬──────────────┘    │  Product)        │
  │                   └─────────┬────────┘
  │                             │
┌─▼─────────────────────────────▼─┐
│       Response Generation       │
│    (Formatting & Delivery)      │
└─┬─────────────────────────────┬─┘
  │                             │
┌─▼─────────────┐     ┌─────────▼─────────┐
│ Product DB    │     │  Memory System    │
│ (Catalog)     │     │ (Conversation     │
└───────────────┘     │  History)         │
                      └───────────────────┘
```

This architecture allows the agent to:
1. Receive and analyze user queries about EV charging solutions
2. Route to the appropriate specialized chain (sales information or product comparison)
3. Access product information from the catalog
4. Maintain conversation context through the memory system
5. Generate helpful, contextually relevant responses about EV charging options

By following this approach, we've created a flexible sales support agent that can be easily extended with additional capabilities like installation scheduling, compatibility checking with specific vehicle models, or integration with external systems.

## License

MIT
