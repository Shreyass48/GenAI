import express from "express";
import cors from "cors";
import { generate } from "./chatbot.js";
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Jay Ganesh!");
});

app.post("/api/chat", async (req, res) => {
  const { message, threadId } = req.body;

  if (!message && !threadId) {
    return res.status(400).json({ error: "Message and threadId are required" });
  }

  const result = await generate({ userMessage: message, threadId });
  res.json({ message: result });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
