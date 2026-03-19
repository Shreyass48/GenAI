# Jarvis - Smart Daily AI Assistant

A full-stack conversational AI application with a modern chat interface. Jarvis is your intelligent assistant for daily tasks, questions, and ideas.

## 🎯 Features

- **Real-time Chat Interface** — Clean, responsive UI with message streaming
- **Thread-based Conversations** — Maintain separate conversation threads with unique IDs
- **AI-Powered Responses** — Integrated with GROQ API for intelligent responses
- **Web Search Integration** — Tavily search for up-to-date information
- **Markdown Support** — Rich message formatting with syntax highlighting
- **Dark Theme UI** — Modern dark-themed interface with Tailwind CSS
- **Session Management** — Message history within conversation threads

## 📋 Tech Stack

### Frontend

- **Next.js 16** — React framework with TypeScript
- **React 19** — UI library
- **Tailwind CSS 4** — Utility-first CSS framework
- **React Markdown** — Render markdown in chat messages
- **Syntax Highlighting** — rehype-highlight for code blocks

### Backend

- **Express.js 5** — REST API server
- **GROQ SDK** — AI language model integration
- **Tavily** — Web search capability
- **Node.js Cache** — Thread message caching
- **CORS** — Cross-origin request handling

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn
- GROQ API Key
- Tavily API Key (optional)

### Setup

#### 1. Clone & Install

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd www
npm install
```

#### 2. Environment Variables

Create a `.env` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

#### 3. Run Backend

```bash
node server.js
# Server runs on http://localhost:3001
```

#### 4. Run Frontend (in another terminal)

```bash
cd www
npm run dev
# Frontend runs on http://localhost:3000
```

Visit **http://localhost:3000** to start chatting!

## 📁 Project Structure

```
final-model/
├── server.js                 # Express API server
├── chatbot.js               # AI chatbot logic
├── package.json             # Backend dependencies
├── .env                     # Environment variables
│
└── www/                     # Next.js Frontend
		├── app/
		│   ├── page.tsx        # Main page layout
		│   ├── layout.tsx       # Root layout
		│   ├── globals.css      # Global styles
		│   └── components/
		│       ├── ChatContainer.tsx    # Main chat component
		│       ├── ChatInput.tsx        # Message input
		│       └── MessageBubble.tsx    # Message display
		├── public/             # Static assets
		├── package.json        # Frontend dependencies
		└── tsconfig.json       # TypeScript config
```

## 🔌 API Endpoints

### `POST /api/chat`

Send a message and receive an AI response.

**Request:**

```json
{
  "message": "Hello, what's the weather?",
  "threadId": "unique-thread-id-123"
}
```

**Response:**

```json
{
  "message": "I can help you with weather information. Please specify your location..."
}
```

**Error Response:**

```json
{
  "error": "Message and threadId are required"
}
```

## 🎨 UI Components

### ChatContainer

Main chat interface with message list and input area.

### MessageBubble

Displays individual messages with markdown support and syntax highlighting.

### ChatInput

Text input with multiline support (Enter to send, Shift+Enter for new line).

## ⚙️ Configuration

### API Base URL

The frontend connects to the backend at `http://localhost:3001/api/chat`. Change this in `ChatContainer.tsx` if deploying to different hosts.

### Thread ID

Each chat session generates a random thread ID on page load to enable multi-thread conversations on the backend.

## 🐛 Troubleshooting

### Connection Error

**Issue:** "Sorry, something went wrong while contacting the AI service"

- Ensure backend is running on port 3001
- Check GROQ API key is valid in `.env`
- Verify CORS is enabled

### Empty Response

**Issue:** Message shows "I received your message but the response format was unexpected"

- Check backend response format matches `{ message: "..." }`
- Verify API endpoint returns valid JSON

## 📝 Scripts

### Backend

```bash
node server.js              # Start server
```

### Frontend

```bash
npm run dev                 # Start dev server
npm run build               # Build for production
npm start                   # Start production server
npm run lint                # Run ESLint
```

## 🔐 Security Notes

- API keys should never be exposed in frontend code
- Use environment variables for sensitive data
- CORS is enabled for local development; restrict in production
- Validate and sanitize all user inputs on backend

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [GROQ API](https://console.groq.com)
- [Tavily Search API](https://tavily.com)
- [Tailwind CSS](https://tailwindcss.com)

---

**Created with ❤️ | Jarvis - Your Smart Assistant**
