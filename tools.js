import "dotenv/config";
import { tavily } from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TVLY_API_KEY });

export async function webSearch({ query }) {
  console.log(`Searching on web...`);
  const response = await tvly.search(query);
  const finalresult = response.results
    .map((result) => {
      return result.content;
    })
    .join("\n\n");
  return finalresult;
}
