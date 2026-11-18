"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "@/services/apiClient";
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  Loader2,
  AlertCircle,
  ArrowRight,
  Bot,
  User,
  MessageSquare,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isError?: boolean;
}

const STARTER_PROMPTS = [
  "What services do you offer?",
  "Tell me about your production gear",
  "Where are you located?",
  "How do I start a project?",
];

/**
 * Text renderer that styles markdown bullet points, bold tags, and paragraphs
 * according to the locked Nana Creative brand identity.
 */
function FormattedMessage({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-[#1B263B]">
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();
        const lines = trimmed.split("\n");
        const isBulletList = lines.every((line) => /^[-*•]\s+/.test(line.trim()));

        if (isBulletList) {
          return (
            <ul key={bIdx} className="space-y-1.5 pl-1 my-1">
              {lines.map((line, lIdx) => {
                const itemContent = line.replace(/^[-*•]\s+/, "");
                return (
                  <li key={lIdx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8CC63F] shrink-0 mt-1.5" />
                    <span>{renderInlineText(itemContent)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        return (
          <p key={bIdx} className="leading-relaxed">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && <br />}
                {renderInlineText(line)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function renderInlineText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-[#0B3B24]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={index} className="italic text-[#1B263B]/90">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

export default function NanaAiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("auto");
      // Focus input on desktop
      if (typeof window !== "undefined" && window.innerWidth >= 640) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom("smooth");
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend ?? inputValue).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      role: "user",
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setLastFailedPrompt(null);

    try {
      const response = await apiClient.chat.sendMessage(messageText);

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role: "assistant",
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: unknown) {
      console.error("[NanaAiChat] Chat request failed:", error);
      setLastFailedPrompt(messageText);

      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          "I'm temporarily having trouble connecting to the Nana Creative AI service. The server may be warming up or experiencing high traffic. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setLastFailedPrompt(null);
    setInputValue("");
  };

  const handleRetry = () => {
    if (lastFailedPrompt) {
      // Remove last error message
      setMessages((prev) => prev.filter((m) => !m.isError));
      handleSendMessage(lastFailedPrompt);
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right, circular #0B3B24 button with #8CC63F sparkle icon) */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              type="button"
              onClick={() => setIsOpen(true)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Open Nana AI Assistant"
              className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#0B3B24] text-white shadow-2xl shadow-[#0B3B24]/40 border-2 border-[#8CC63F]/40 transition-colors hover:border-[#8CC63F] hover:bg-[#082A19] focus:outline-none focus:ring-4 focus:ring-[#8CC63F]/30"
            >
              {/* Sprout Lime Sparkle Icon */}
              <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-[#8CC63F] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />

              {/* Pulsing Active AI Status Dot */}
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8CC63F] opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-[#0B3B24] bg-[#8CC63F]" />
              </span>

              {/* Hover Tooltip (Desktop) */}
              <div className="pointer-events-none absolute right-full mr-3.5 hidden sm:group-hover:flex items-center">
                <div className="whitespace-nowrap rounded-xl border border-[#8CC63F]/30 bg-[#0B3B24] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#8CC63F]" />
                  <span>Chat with Nana AI</span>
                </div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Panel Modal / Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop on mobile for sheet dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-[#082A19]/40 backdrop-blur-xs sm:hidden"
            />

            {/* Chat Container */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="fixed inset-x-0 bottom-0 z-50 flex flex-col h-[85vh] sm:h-[620px] sm:max-h-[85vh] sm:w-[420px] sm:inset-x-auto sm:right-6 sm:bottom-6 rounded-t-3xl sm:rounded-3xl border border-[#E8F3EC] bg-white shadow-2xl shadow-[#0B3B24]/20 overflow-hidden"
            >
              {/* Header */}
              <div className="relative flex items-center justify-between border-b border-[#E8F3EC] bg-[#0B3B24] px-5 py-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#8CC63F]/40 bg-[#082A19] flex items-center justify-center shrink-0">
                    <Image
                      src="/images/logo.png"
                      alt="Nana Creative Logo"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold tracking-tight text-white">
                        Nana AI
                      </h3>
                      <span className="rounded-full bg-[#8CC63F]/20 px-2 py-0.5 text-[10px] font-bold text-[#8CC63F] border border-[#8CC63F]/30 uppercase tracking-wider">
                        Live
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-[#8CC63F] animate-pulse" />
                      <span className="text-[11px] font-medium text-[#E8F3EC]/80">
                        Ask about Nana Creative
                      </span>
                    </div>
                  </div>
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-1.5">
                  {messages.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearChat}
                      title="Clear Conversation"
                      aria-label="Clear Conversation"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-[#E8F3EC]/70 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close Nana AI Assistant"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[#E8F3EC]/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Message Thread Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#F7F9F8]">
                {/* Empty State: Greeting & Quick Starter Prompts */}
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center text-center py-6 px-2">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F3EC] text-[#0B3B24]">
                      <Sparkles className="h-6 w-6 text-[#8CC63F]" />
                    </div>
                    <h4 className="text-base font-bold text-[#0B3B24]">
                      Welcome to Nana Creative
                    </h4>
                    <p className="mt-1.5 text-xs text-[#1B263B]/75 leading-relaxed max-w-xs">
                      I&apos;m your AI assistant trained on our production portfolio, creative strategy, gear, and regional presence in Dire Dawa and Addis Ababa.
                    </p>

                    {/* Starter Prompt Chips */}
                    <div className="mt-5 w-full space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B3B24]/70 block">
                        Quick Questions
                      </span>
                      <div className="flex flex-col gap-2">
                        {STARTER_PROMPTS.map((prompt, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSendMessage(prompt)}
                            className="group flex items-center justify-between rounded-xl border border-[#E8F3EC] bg-white px-3.5 py-2.5 text-left text-xs font-medium text-[#1B263B] shadow-xs transition-all hover:border-[#8CC63F] hover:bg-[#E8F3EC]/40 hover:text-[#0B3B24]"
                          >
                            <span>{prompt}</span>
                            <ArrowRight className="h-3.5 w-3.5 text-[#8CC63F] transition-transform group-hover:translate-x-0.5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Message List */}
                {messages.map((message) => {
                  const isUser = message.role === "user";

                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm shadow-xs ${
                          isUser
                            ? "rounded-tr-xs bg-[#0B3B24] text-[#F7F9F8]"
                            : message.isError
                            ? "rounded-tl-xs border border-red-200 bg-red-50 text-red-900"
                            : "rounded-tl-xs border border-[#E8F3EC] bg-white text-[#1B263B]"
                        }`}
                      >
                        {!isUser && (
                          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0B3B24]">
                            <Sparkles className="h-3 w-3 text-[#8CC63F]" />
                            <span>Nana AI</span>
                          </div>
                        )}

                        {isUser ? (
                          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        ) : (
                          <FormattedMessage content={message.content} />
                        )}

                        {/* Retry button for error states */}
                        {message.isError && lastFailedPrompt && (
                          <div className="mt-3 pt-2.5 border-t border-red-200">
                            <button
                              type="button"
                              onClick={handleRetry}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-red-700"
                            >
                              <RotateCcw className="h-3 w-3" />
                              <span>Retry Question</span>
                            </button>
                          </div>
                        )}
                      </div>

                      <span className="mt-1 px-1 text-[10px] text-[#1B263B]/40">
                        {message.timestamp}
                      </span>
                    </motion.div>
                  );
                })}

                {/* Animated Typing/Thinking Indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-start"
                  >
                    <div className="rounded-2xl rounded-tl-xs border border-[#E8F3EC] bg-white p-3.5 shadow-xs">
                      <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0B3B24]">
                        <Sparkles className="h-3 w-3 text-[#8CC63F]" />
                        <span>Nana AI Thinking</span>
                      </div>
                      <div className="flex items-center gap-1.5 py-1">
                        <span className="h-2 w-2 rounded-full bg-[#8CC63F] animate-bounce [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 rounded-full bg-[#8CC63F] animate-bounce [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 rounded-full bg-[#8CC63F] animate-bounce" />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="border-t border-[#E8F3EC] bg-white p-3 sm:p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder="Ask about our services, gear, or projects..."
                    className="flex-1 rounded-xl border border-[#E8F3EC] bg-[#F7F9F8] px-3.5 py-2.5 text-xs sm:text-sm text-[#1B263B] placeholder-[#1B263B]/40 transition-colors focus:border-[#8CC63F] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8CC63F] disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    aria-label="Send message"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B3B24] text-[#8CC63F] shadow-sm transition-all hover:bg-[#082A19] hover:scale-105 active:scale-95 disabled:opacity-40 disabled:pointer-events-none disabled:transform-none"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-[#8CC63F]" />
                    ) : (
                      <Send className="h-4 w-4 text-[#8CC63F]" />
                    )}
                  </button>
                </form>
                <div className="mt-2 text-center text-[10px] text-[#1B263B]/40">
                  Powered by Nana Creatives Intelligence Engine
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
