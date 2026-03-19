"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage, MessageBubble } from "./MessageBubble";

export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, scrollToBottom]);

  const handleSend = useCallback(async (input: string) => {
    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = (await res.json()) as { message?: string };
      const reply =
        data.message ??
        "I received your message but the response format was unexpected.";

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content:
          "Sorry, something went wrong while contacting the AI service. Please try again.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="chat-main h-full min-h-0 w-full overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-950/70 shadow-[0_24px_80px_rgba(2,6,23,0.55)] backdrop-blur-xl">
      <header className="border-b border-slate-800/80 px-6 py-5 sm:px-7">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 border border-emerald-500/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Online · Ready</span>
          </div>
          <h1 className="mt-2 text-lg font-semibold tracking-tight text-slate-50">
            Jarvis
          </h1>
          <p className="text-xs text-slate-400">
            Your smart daily assistant — ask me anything.
          </p>
        </div>
      </header>

      <main className="chat-messages min-h-0 px-6 py-6 sm:px-7">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <div className="chat-input-wrapper px-6 pb-6 pt-4 sm:px-7 sm:pb-7">
        <div className="mx-auto w-full max-w-3xl">
          <ChatInput onSend={handleSend} disabled={loading} />
          <p className="mt-2 text-[11px] text-center text-slate-500">
            Press <span className="font-semibold text-slate-300">Enter</span> to
            send,{" "}
            <span className="font-semibold text-slate-300">Shift + Enter</span>{" "}
            for a new line.
          </p>
        </div>
      </div>
    </div>
  );
}
