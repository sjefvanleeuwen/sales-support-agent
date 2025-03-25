import { createSalesChain, createProductComparisonChain } from "../chains/salesChain.js";
import { getOllamaModel } from "../utils/ollamaUtils.js";
import { getAllProducts, getProductByName } from "../data/productData.js";

export class SalesSupportAgent {
  constructor() {
    try {
      console.log("Initializing Ollama model...");
      this.llm = getOllamaModel();
      console.log("Creating sales chain...");
      this.salesChain = createSalesChain(this.llm);
      this.productNames = getAllProducts().map(p => p.name);
      console.log("Sales agent initialized successfully");
    } catch (error) {
      console.error("Error during initialization:", error);
      throw error;
    }
  }

  async handleQuery(userInput) {
    try {
      console.log("Processing query:", userInput);
      
      // Check if this is a product comparison request
      if (userInput.toLowerCase().includes("compare") || 
          userInput.toLowerCase().includes("difference") ||
          userInput.toLowerCase().includes("vs")) {
        
        return await this.handleProductComparison(userInput);
      }
      
      // Handle general sales query
      console.log("Sending query to sales chain...");
      const response = await this.salesChain.call({
        input: userInput
      });
      
      return response.response;
    } catch (error) {
      console.error("Error handling query:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return "I'm sorry, I encountered an error while processing your request. Please try again.";
    }
  }

  async handleProductComparison(userInput) {
    // Simple logic to detect which products to compare
    const mentionedProducts = this.productNames.filter(name => 
      userInput.toLowerCase().includes(name.toLowerCase())
    );
    
    if (mentionedProducts.length < 2) {
      return await this.salesChain.call({
        input: userInput
      }).then(res => res.response);
    }
    
    const comparisonChain = createProductComparisonChain(this.llm, mentionedProducts);
    const response = await comparisonChain.call({
      input: userInput
    });
    
    // Change this line to use response.response instead of response.comparison
    return response.response;
  }
}
