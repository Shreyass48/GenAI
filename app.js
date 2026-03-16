import "dotenv/config";
import readline from "node:readline/promises";
import Groq from "groq-sdk";
import { webSearch } from "./tools.js";

const groq = new Groq({ apiKey: process.env.GROQ_LLM_KEY });

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const messages = [
    {
      role: "system",
      content: `You are a smart assistant for answering questions about the world. 
        You have access to a following tools 
        1. webSearch({q}:{query: string}): Search the latest information about the world on the web.
        
        current Date and Time: ${new Date().toUTCString()}`,
    },
  ];

  while (true) {
    const question = await rl.question("You: ");

    if (question.toLowerCase() === "exit") {
      console.log("Exiting...");
      break;
    }

    messages.push({ role: "user", content: question });

    // LLM react LOOP
    while (true) {
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0,
        messages: messages,
        // added tools to the model
        tools: [
          {
            type: "function",
            function: {
              name: "webSearch",
              description:
                "Search the latest information about the world on the web",
              parameters: {
                // JSON Schema object
                type: "object",
                properties: {
                  query: {
                    type: "string",
                    description: "The search query to perform search on.",
                  },
                },
                required: ["query"],
              },
            },
          },
        ],
        tool_choice: "auto",
      });

      // pushing the assistant response to messages so that LLM can have the context of previous tool calls and their responses
      messages.push(completion.choices[0].message);

      const tool_calls = completion.choices[0].message.tool_calls;

      if (!tool_calls) {
        console.log(`Assistant: ${completion.choices[0].message.content}`);
        break;
      }

      for (const tool of tool_calls) {
        const functionName = tool.function.name;
        const functionArgs = tool.function.arguments;

        if (functionName === "webSearch") {
          const toolResult = await webSearch(JSON.parse(functionArgs));

          // for LLM to summerize the tool result and answer the question asked by user
          messages.push({
            tool_call_id: tool.id,
            role: "tool",
            name: functionName,
            content: toolResult,
          });
        }
      }
    }
  }
  rl.close();
}

main();
