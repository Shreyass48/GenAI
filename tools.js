import "dotenv/config";
import { tavily } from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TVLY_API_KEY });

export async function webSearch({ query }) {
  const response = await tvly.search(query);
  console.log(response);
  return response;
}
