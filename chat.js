import readline from "node:readline/promises";
import Groq from "groq-sdk";
import { vectorStore } from "./prepare.js";

const groq = new Groq({ apiKey: process.env.GROQ_LLM_KEY });

export async function chat() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const question = await rl.question("You : ");

    if (question.toLowerCase() === "exit") {
      console.log("Exiting...");
      rl.close();
      process.exit(0);
    }

    //STEP 4 : retrieve relevant documents from vector database
    const relevantChunks = await vectorStore.similaritySearch(question, 3); // return k chunks(3)

    const context = relevantChunks
      .map((chunk) => chunk.pageContent)
      .join("\n\n"); // extract the text content from the retrieved chunks

    const SYSTEM_PROMPT = `You are an assistant for question-answering tasks. Use the following relevant pieces of retrieved context to answer the question. If you don't know the answer, say I don't know.`;
    const userQuery = `Question: ${question}
        Relevant context: ${context}
        Answer:`;

    // STEP 5 : user query + retrieved context -> LLM prompt -> generate response
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userQuery,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    // STEP 6 : Display final response
    console.log("Assistant : ", completion.choices[0].message.content);
  }
}

chat();
