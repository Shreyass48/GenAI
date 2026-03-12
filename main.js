import { Groq } from "groq-sdk";
import "dotenv/config";

// Initialize the Groq client using the API key from .env.
const groq = new Groq({ apiKey: process.env.GROQ_LLM_KEY });

async function main() {
  // Send a simple chat prompt to verify the integration end-to-end.
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user", // The user's message to the assistant.
        content: "Hi", // The content of the user's message.
      },
    ],
  });

  // Print the assistant's reply from the first choice.
  console.log(completion.choices[0].message.content);
}

main();
