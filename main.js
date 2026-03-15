import { Groq } from "groq-sdk";
import "dotenv/config";
import { systemPrompt, userPrompt } from "./prompt.js";

// Initialize the Groq client using the API key from .env.
const groq = new Groq({ apiKey: process.env.GROQ_LLM_KEY });

async function main() {
  // Send a simple chat prompt to verify the integration end-to-end.
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    // temperature: 0.7,
    // stop: ["vi"],
    // max_completion_tokens: 100,  //generate a 100 tokens response
    // frequency_penalty: 0.5,      // Reduce the likelihood of repeating the same line verbatim
    // presence_penalty: 0.5,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  console.log(completion.choices[0].message.content);
}

main();
