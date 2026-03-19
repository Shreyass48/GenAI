import "dotenv/config";
import Groq from "groq-sdk";
import { webSearch } from "./tools.js";

const groq = new Groq({ apiKey: process.env.GROQ_LLM_KEY });

export async function generate({ userMessage }) {
  const messages = [
    {
      role: "system",
      content: `You are Jarvis, a smart personal assistant.
                    If you know the answer to a question, answer it directly in plain English.
                    If the answer requires real-time, local, or up-to-date information, or if you don’t know the answer, use the available tools to find it.
                    You have access to the following tool:
                    webSearch(query: string): Use this to search the internet for current or unknown information.
                    Decide when to use your own knowledge and when to use the tool.
                    Do not mention the tool unless needed.

                    Examples:
                    Q: What is the capital of France?
                    A: The capital of France is Paris.

                    Q: What's the weather in Mumbai right now?
                    A: (use the search tool to find the latest weather)

                    Q: Who is the Prime Minister of India?
                    A: The current Prime Minister of India is Narendra Modi.

                    Q: Tell me the latest IT news.
                    A: (use the search tool to get the latest news)

                    current date and time: ${new Date().toUTCString()}`,
    },
  ];

  messages.push({ role: "user", content: userMessage });

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
      return completion.choices[0].message.content;
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
