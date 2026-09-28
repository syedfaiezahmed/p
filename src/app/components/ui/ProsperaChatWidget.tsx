"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  MessageSquare,
  Bot,
  X,
  Send,
  Sparkles,
  Phone,
  RefreshCw,
  ChevronDown,
  User,
  ShieldCheck,
  Building2,
  ExternalLink,
} from "lucide-react";
import { useAiSettings } from "@/lib/stores/aiStore";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  source?: string;
}

const DEFAULT_QUICK_ACTIONS = [
  "💼 Bookkeeping Packages",
  "📊 Fractional CFO",
  "🛡️ ZATCA Phase 2 Info",
  "🏷️ Pricing & Retainers",
  "📞 Contact Office",
];

export default function ProsperaChatWidget() {
  const { aiSettings } = useAiSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Welcome Message from AI Settings
  useEffect(() => {
    const welcome =
      aiSettings.welcomeMessage ||
      "**Assalamu Alaikum & Welcome to Prospera Advisory!** 📈\n\nI am your 24/7 AI Business Consultant. How may I assist your organization today?\n\n• 💼 **Bookkeeping & Accounting Packages** (SOCPA & ZATCA ready)\n• 📊 **Fractional CFO & Financial Advisory**\n• 👥 **Payroll & Wage Protection System (WPS)**\n• 📅 **Schedule an Executive Consultation Call**";

    setMessages([
      {
        id: "welcome-msg",
        sender: "ai",
        text: welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: "system",
      },
    ]);
  }, [aiSettings.welcomeMessage]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setHasUnread(false);
    }
  }, [messages, isOpen, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          source: data.source,
        };
        setMessages((prev) => [...prev, aiMsg]);
        if (!isOpen) setHasUnread(true);
      } else {
        throw new Error(data.error || "Failed to receive AI response.");
      }
    } catch (err: any) {
      const fallbackAiMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: "ai",
        text: "Thank you for reaching out to Prospera KSA. Our consulting team specializes in corporate bookkeeping, ZATCA Phase 2, and CFO advisory. Please contact our senior partner directly at **+966 557 147 386** or email **inquire@prosperaksa.com**.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackAiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    const welcome =
      aiSettings.welcomeMessage ||
      "Assalamu Alaikum! How can Prospera Corporate Advisory assist your enterprise today?";
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "ai",
        text: welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const quickActions =
    aiSettings.quickReplies && aiSettings.quickReplies.length > 0
      ? aiSettings.quickReplies
      : DEFAULT_QUICK_ACTIONS;

  // Simple Markdown text renderer for bold, bullet points and line breaks
  const renderFormattedText = (content: string) => {
    return content.split("\n").map((line, idx) => {
      let formattedLine = line;

      // Check if bullet point
      const isBullet = formattedLine.startsWith("• ") || formattedLine.startsWith("- ");
      const isHeading = formattedLine.startsWith("### ") || formattedLine.startsWith("## ");

      // Basic replacement for **bold**
      const parts = formattedLine.split(/(\*\*.*?\*\*)/g);

      return (
        <span
          key={idx}
          className={`block ${
            isHeading
              ? "font-bold text-white text-sm my-1"
              : isBullet
              ? "pl-2 my-0.5 text-slate-200"
              : "my-0.5"
          }`}
        >
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-bold text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
              const text = part.substring(1, part.indexOf("]("));
              const url = part.substring(part.indexOf("](") + 2, part.length - 1);
              return (
                <Link
                  key={pIdx}
                  href={url}
                  className="text-pink-300 font-semibold underline hover:text-pink-200 inline-flex items-center gap-0.5"
                >
                  {text}
                  <ExternalLink className="w-3 h-3 inline" />
                </Link>
              );
            }
            return <span key={pIdx}>{part}</span>;
          })}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Trigger Button */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="mb-2 hidden sm:flex items-center gap-2 rounded-full bg-slate-900/95 border border-slate-700/80 px-3.5 py-1.5 text-xs text-white shadow-xl backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold">AI Business Advisor</span>
              <span className="text-[10px] text-pink-300 font-medium">Online</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open AI Assistant"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#2A1A4A] via-[#8A1650] to-[#b62166] text-white shadow-2xl transition-all duration-300 hover:shadow-[#8A1650]/40 hover:shadow-2xl cursor-pointer border-2 border-white/20"
        >
          {/* Notification Dot */}
          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[9px] font-bold text-white items-center justify-center">
                1
              </span>
            </span>
          )}

          {isOpen ? (
            <X className="h-6 w-6 transition-transform duration-200" />
          ) : (
            <div className="relative">
              <Bot className="h-6 w-6 transition-transform group-hover:rotate-12" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-pink-200 animate-pulse" />
            </div>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-3 bottom-22 sm:bottom-24 sm:right-6 sm:left-auto z-50 flex h-[580px] max-h-[82vh] w-auto sm:w-[420px] flex-col overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-950/95 text-slate-100 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="relative border-b border-slate-800 bg-gradient-to-r from-[#2A1A4A] via-[#382460] to-[#8A1650] p-4 text-white shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-inner">
                    <Bot className="h-5 w-5 text-pink-200" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                      {aiSettings.aiName || "Prospera AI Advisor"}
                    </h3>
                    <p className="text-[11px] text-pink-200/90 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-400" />
                      <span>{aiSettings.tagline || "24/7 Financial & Business Desk"}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleClearChat}
                    title="Reset Chat"
                    className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Minimize"
                    className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Messages Viewport */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((msg) => {
                const isAi = msg.sender === "ai";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-2.5 ${isAi ? "justify-start" : "justify-end"}`}
                  >
                    {isAi && (
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#2A1A4A] to-[#8A1650] text-white shadow-xs mt-0.5">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                    )}

                    <div className={`max-w-[82%] space-y-1 ${isAi ? "items-start" : "items-end"}`}>
                      <div
                        className={`rounded-2xl p-3.5 shadow-sm text-xs leading-relaxed ${
                          isAi
                            ? "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm"
                            : "bg-gradient-to-r from-[#8A1650] to-[#b62166] text-white rounded-tr-sm font-medium"
                        }`}
                      >
                        {isAi ? renderFormattedText(msg.text) : msg.text}
                      </div>

                      <div
                        className={`flex items-center gap-1.5 text-[10px] text-slate-500 px-1 ${
                          isAi ? "justify-start" : "justify-end"
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {isAi && msg.source === "gemini" && (
                          <span className="rounded bg-indigo-500/10 text-indigo-300 px-1 py-0.2 border border-indigo-500/20 text-[9px]">
                            Gemini 1.5
                          </span>
                        )}
                      </div>
                    </div>

                    {!isAi && (
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-300 border border-slate-700 shadow-xs mt-0.5">
                        <User className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-slate-400 text-xs"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#8A1650] text-white">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="rounded-2xl bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-tl-sm flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-bounce"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Suggestion Pills */}
            <div className="border-t border-slate-800/80 bg-slate-950/70 p-2.5">
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(action)}
                    disabled={isTyping}
                    className="flex-shrink-0 rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1 font-medium text-slate-300 hover:border-[#8A1650] hover:bg-slate-800 hover:text-white transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="border-t border-slate-800 bg-slate-900 p-3"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about ZATCA, bookkeeping, CFO..."
                  disabled={isTyping}
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#8A1650] focus:outline-none focus:ring-1 focus:ring-[#8A1650] disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#8A1650] to-[#b62166] text-white shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              {/* Direct WhatsApp Callout Footer */}
              <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Prospera KSA Advisory Engine</span>
                </span>
                <a
                  href="https://wa.me/966557147386?text=Hello%20Prospera%20Advisory,%20I%20would%20like%20to%20connect%20with%20a%20consultant."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                >
                  <Phone className="h-3 w-3" />
                  <span>WhatsApp Consultant</span>
                </a>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
