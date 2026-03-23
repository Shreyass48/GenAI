# PolicyPilot — AI-Powered Employee Policy Assistant

PolicyPilot is a Retrieval-Augmented Generation (RAG) application that lets employees ask natural language questions against internal policy documents. It indexes PDF docs into a Pinecone vector store using OpenAI embeddings, then answers queries using the Groq-hosted Llama 3.3 model.

---

## How It Works

```
PDF Document
     │
     ▼
[1] Load PDF         (LangChain PDFLoader)
     │
     ▼
[2] Chunk Text       (RecursiveCharacterTextSplitter — 500 chars, 100 overlap)
     │
     ▼
[3] Embed Chunks     (OpenAI text-embedding-3-small)
     │
     ▼
[4] Store in Pinecone (vector database)
     │
     ▼  ← User Question
[5] Similarity Search (top-3 relevant chunks)
     │
     ▼
[6] LLM Inference    (Groq — llama-3.3-70b-versatile)
     │
     ▼
  Answer
```

---

## Tech Stack

| Layer         | Technology                                                                   |
| ------------- | ---------------------------------------------------------------------------- |
| Runtime       | [Bun](https://bun.sh)                                                        |
| LLM           | Groq — `llama-3.3-70b-versatile`                                             |
| Embeddings    | OpenAI — `text-embedding-3-small`                                            |
| Vector Store  | Pinecone                                                                     |
| Orchestration | LangChain (`@langchain/core`, `@langchain/community`, `@langchain/pinecone`) |
| PDF Parsing   | `pdf-parse` via LangChain PDFLoader                                          |

---

## Project Structure

```
├── prepare.js   # Loads PDF, splits, embeds, and upserts into Pinecone
├── rag.js       # Entry point — triggers document indexing
├── chat.js      # Interactive CLI chat loop for querying the policy docs
├── package.json
└── bun.lockb
```

---

## Prerequisites

- [Bun](https://bun.sh) installed
- A [Pinecone](https://www.pinecone.io) account with an index created
- An [OpenAI](https://platform.openai.com) API key
- A [Groq](https://console.groq.com) API key

---

## Setup

### 1. Install dependencies

```bash
bun install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_pinecone_index_name
GROQ_LLM_KEY=your_groq_api_key
```

### 3. Add your policy document

Place your internal policy PDF at the project root and name it `cg-internal-docs.pdf`, or update the `filePath` in `rag.js`.

---

## Usage

### Step 1 — Index the documents

Run this once to load, chunk, embed, and store the PDF content in Pinecone:

```bash
bun run rag.js
```

### Step 2 — Start the chat assistant

```bash
bun run chat.js
```

Then type your questions at the prompt:

```
You : What is the leave policy for new employees?
Assistant : New employees are eligible for ...

You : exit
Exiting...
```

Type `exit` to quit.

---

## Environment Variables Reference

| Variable              | Description                              |
| --------------------- | ---------------------------------------- |
| `OPENAI_API_KEY`      | OpenAI API key for generating embeddings |
| `PINECONE_API_KEY`    | Pinecone API key                         |
| `PINECONE_INDEX_NAME` | Name of your Pinecone index              |
| `GROQ_LLM_KEY`        | Groq API key for LLM inference           |
