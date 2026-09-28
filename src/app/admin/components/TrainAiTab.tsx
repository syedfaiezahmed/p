"use client";

import { useState } from "react";
import {
  Brain,
  Sparkles,
  Terminal,
  Copy,
  RotateCcw,
  HelpCircle,
  Plus,
  Trash2,
  Bot,
  Send,
  Wand2,
} from "lucide-react";
import { AiSettingsState } from "@/lib/types/productTypes";
import { PROMPT_PRESETS } from "@/data/initialData";
import { api } from "@/lib/api";

interface TrainAiTabProps {
  aiSettings: AiSettingsState;
  onSaveAiSettings: (settings: AiSettingsState) => void;
}

export default function TrainAiTab({
  aiSettings,
  onSaveAiSettings,
}: TrainAiTabProps) {
  const [formData, setFormData] = useState<AiSettingsState>({ ...aiSettings });
  const [selectedPresetId, setSelectedPresetId] = useState<string>("prospera_executive");
  const [copiedInstruction, setCopiedInstruction] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Playground / Simulator
  const [testQuery, setTestQuery] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: "user" | "bot"; text: string; time: string }>
  >([
    {
      sender: "bot",
      text: "⚡ **Prospera AI Corporate Advisor Simulator Active!** Ask questions regarding *'Bookkeeping Retainers'*, *'Fractional CFO Scope'*, *'ZATCA Phase 2 E-Invoicing'*, or *'Consultation Scheduling'* to test your live system instructions.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  // Add FAQ modal
  const [isAddFaqOpen, setIsAddFaqOpen] = useState(false);
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [newFaqCategory, setNewFaqCategory] = useState("Services");

  const handleApplyPreset = (presetId: string) => {
    const found = PROMPT_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setSelectedPresetId(presetId);
      setFormData((prev) => ({
        ...prev,
        systemInstruction: found.prompt,
      }));
    }
  };

  const handleCopyInstruction = () => {
    navigator.clipboard.writeText(formData.systemInstruction);
    setCopiedInstruction(true);
    setTimeout(() => setCopiedInstruction(false), 2000);
  };

  const handleSave = () => {
    const updated = {
      ...formData,
      updatedAt: new Date().toISOString(),
    };
    onSaveAiSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSendTestMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!testQuery.trim() || isSimulating) return;

    const userText = testQuery.trim();
    setTestQuery("");

    setChatMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setIsSimulating(true);

    try {
      const res = await api.testChat(userText, formData);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Assalamu Alaikum! Thank you for contacting Prospera. Our advisors are available directly at +966 557 147 386 or inquire@prosperaksa.com.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleAddFaq = () => {
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
    const newFaq = {
      id: `faq-${Date.now()}`,
      question: newFaqQuestion.trim(),
      answer: newFaqAnswer.trim(),
      category: newFaqCategory,
      active: true,
    };
    setFormData((prev) => ({
      ...prev,
      customFaqs: [...(prev.customFaqs || []), newFaq],
    }));
    setNewFaqQuestion("");
    setNewFaqAnswer("");
    setIsAddFaqOpen(false);
  };

  const handleDeleteFaq = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      customFaqs: prev.customFaqs.filter((f) => f.id !== id),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8A1650]/15 text-[#8A1650]">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                Prospera AI Corporate Advisor Training
                <span className="rounded-md bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/20">
                  Gemini Flash 1.5
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Tune your conversational business advisor, compliance facts, and test simulations in real time.
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 rounded-xl bg-[#8A1650] hover:bg-[#6e1240] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors"
          >
            <Sparkles className="h-4 w-4" />
            <span>Deploy AI Instructions</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Instructions & Training Data */}
        <div className="space-y-6 lg:col-span-7">
          {/* Preset Selector */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300">
                <Wand2 className="h-4 w-4 text-[#8A1650]" />
                <h3 className="font-semibold text-white text-xs uppercase tracking-wider">
                  Instruction Presets
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">Persona Templates</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {PROMPT_PRESETS.slice(0, 2).map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset.id)}
                  className={`rounded-xl border p-3.5 text-left transition-all ${
                    selectedPresetId === preset.id
                      ? "border-[#8A1650] bg-[#8A1650]/10 text-white shadow-sm"
                      : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <p className="font-semibold text-xs leading-snug">{preset.title}</p>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                    {preset.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Master Instructions Editor */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300">
                <Terminal className="h-4 w-4 text-indigo-400" />
                <h3 className="font-semibold text-white uppercase tracking-wider">
                  Master System Instruction Prompt
                </h3>
              </div>

              <button
                onClick={handleCopyInstruction}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>{copiedInstruction ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            <textarea
              rows={9}
              value={formData.systemInstruction}
              onChange={(e) => setFormData({ ...formData, systemInstruction: e.target.value })}
              placeholder="Define corporate tone, ZATCA guidance, and booking instructions..."
              className="w-full font-mono rounded-xl border border-slate-800 bg-slate-950 p-3 text-slate-200 text-xs leading-relaxed focus:border-[#8A1650] focus:outline-none"
            />
          </div>

          {/* FAQs Knowledge Base */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300">
                <HelpCircle className="h-4 w-4 text-emerald-400" />
                <h3 className="font-semibold text-white text-xs uppercase tracking-wider">
                  Verified Knowledge Base & FAQs
                </h3>
              </div>

              <button
                onClick={() => setIsAddFaqOpen(true)}
                className="flex items-center gap-1 rounded-lg bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add FAQ</span>
              </button>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {formData.customFaqs?.map((faq) => (
                <div
                  key={faq.id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs text-slate-200"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="rounded bg-slate-800 border border-slate-700 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                        {faq.category || "Advisory"}
                      </span>
                      <p className="font-semibold text-white mt-1.5">{faq.question}</p>
                      <p className="text-slate-400 mt-0.5 leading-relaxed">{faq.answer}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="rounded-lg p-1 text-slate-500 hover:bg-rose-950/40 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Playground Simulator */}
        <div className="space-y-6 lg:col-span-5">
          <div className="flex h-[620px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3.5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#8A1650] text-white shadow-sm">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-white">Live AI Simulator</h4>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Testing Console
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setChatMessages([
                    {
                      sender: "bot",
                      text: "⚡ Simulator reset. Enter a new query to test.",
                      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    },
                  ])
                }
                title="Reset conversation"
                className="rounded-lg p-1 text-slate-400 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Message Stream */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4 text-xs">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-[#8A1650] text-white font-medium rounded-tr-none"
                        : "border border-slate-800 bg-slate-950 text-slate-200 rounded-tl-none whitespace-pre-wrap"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="mt-1 text-[9px] text-slate-500 px-1">{msg.time}</span>
                </div>
              ))}

              {isSimulating && (
                <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
                  <span className="h-2 w-2 rounded-full bg-[#8A1650] animate-ping" />
                  <span>Synthesizing corporate response...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendTestMessage}
              className="border-t border-slate-800 bg-slate-950 p-3"
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={testQuery}
                  onChange={(e) => setTestQuery(e.target.value)}
                  placeholder="Ask advisor: e.g. What is included in your bookkeeping package?"
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-[#8A1650] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSimulating || !testQuery.trim()}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8A1650] hover:bg-[#6e1240] text-white disabled:opacity-40 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Add FAQ Modal */}
      {isAddFaqOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-100 shadow-2xl">
            <h3 className="text-base font-semibold text-white mb-1">Add Knowledge Base FAQ</h3>
            <p className="text-xs text-slate-400 mb-4">
              Add authoritative facts for the AI Corporate Consultant.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={newFaqCategory}
                  onChange={(e) => setNewFaqCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-[#8A1650] focus:outline-none"
                >
                  <option value="Services">Services & Retainers</option>
                  <option value="Compliance">ZATCA & Statutory Compliance</option>
                  <option value="Pricing">Fee Structure & Models</option>
                  <option value="General">General Consultation</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Question</label>
                <input
                  type="text"
                  value={newFaqQuestion}
                  onChange={(e) => setNewFaqQuestion(e.target.value)}
                  placeholder="e.g. How does Prospera handle ZATCA Phase 2 integrations?"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-[#8A1650] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Answer</label>
                <textarea
                  rows={3}
                  value={newFaqAnswer}
                  onChange={(e) => setNewFaqAnswer(e.target.value)}
                  placeholder="Verified response..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-slate-100 placeholder-slate-500 focus:border-[#8A1650] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsAddFaqOpen(false)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 font-medium text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFaq}
                  className="rounded-xl bg-[#8A1650] px-4 py-2 font-semibold text-white hover:bg-[#6e1240]"
                >
                  Save FAQ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
