import readline from 'readline';
import { SalesSupportAgent } from './agents/salesAgent.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function startSalesAgent() {
  console.log("Sales Support Agent initialized. Type 'exit' to quit.");
  console.log("--------------------------------------------------");
  console.log("How can I assist you with our products today?");

  const salesAgent = new SalesSupportAgent();

  const askQuestion = () => {
    rl.question('> ', async (userInput) => {
      if (userInput.toLowerCase() === 'exit') {
        console.log('Thank you for using our Sales Support Agent. Goodbye!');
        rl.close();
        return;
      }

      try {
        const response = await salesAgent.handleQuery(userInput);
        console.log("\nSales Agent:", response);
        console.log("--------------------------------------------------");
      } catch (error) {
        console.error('Error:', error);
        console.log("I'm sorry, I encountered an error. Please try again.");
      }

      askQuestion();
    });
  };

  askQuestion();
}

startSalesAgent().catch(console.error);
