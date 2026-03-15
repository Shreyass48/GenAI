import "dotenv/config";
import Groq from "groq-sdk";
import { webSearch } from "./tools.js";

const groq = new Groq({ apiKey: process.env.GROQ_LLM_KEY });

async function main() {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `You are a smart assistant for answering questions about the world. 
        You have access to a following tools 
        1. webSearch({q}:{query: string}): Search the latest information about the world on the web.
        `,
      },
      {
        role: "user",
        content: `When was i phone 17 launched?`,
      },
    ],
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

  const tool_calls = completion.choices[0].message.tool_calls;

  if (!tool_calls) {
    console.log(completion.choices[0].message.content);
    return;
  }

  for (const tool of tool_calls) {
    const functionName = tool.function.name;
    const functionArgs = tool.function.arguments;

    if (functionName === "webSearch") {
      const result = await webSearch(JSON.parse(functionArgs));
      //   console.log(`Result from ${functionName}: ${result}`);
    }
  }
}

main();
