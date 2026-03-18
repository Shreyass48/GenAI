"use client";

import React, { useCallback, useState, KeyboardEvent } from "react";

type ChatInputProps = {
  onSend: (value: string) => void;
  disabled?: boolean;
};

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }, [value, onSend, disabled]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input flex items-end gap-3 py-2">
      <textarea
        rows={1}
        className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 border-0 focus:outline-none focus:ring-0 py-2 max-h-32 leading-relaxed"
        placeholder="Send a message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-3 py-2 text-xs font-medium text-emerald-950 shadow-sm transition hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500"
      >
        Send
      </button>
    </div>
  );
}

