import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAiSettings extends Document {
  aiName: string;
  tagline: string;
  welcomeMessage: string;
  systemInstruction: string;
  tone: string;
  temperature: number;
  modelName: string;
  maxOutputTokens: number;
  customFaqs: Array<{
    id: string;
    question: string;
    answer: string;
    category?: string;
    active: boolean;
  }>;
  quickReplies: string[];
  isEnabled: boolean;
  updatedBy: string;
}

const AiSettingsSchema = new Schema<IAiSettings>(
  {
    aiName: { type: String, default: "Prospera AI Corporate Advisor" },
    tagline: { type: String, default: "24/7 Strategic Financial & Consulting Desk" },
    welcomeMessage: { type: String, default: "" },
    systemInstruction: { type: String, default: "" },
    tone: { type: String, default: "Executive, Knowledgeable & High-Trust" },
    temperature: { type: Number, default: 0.7 },
    modelName: { type: String, default: "gemini-1.5-flash" },
    maxOutputTokens: { type: Number, default: 1000 },
    customFaqs: [
      {
        id: String,
        question: String,
        answer: String,
        category: String,
        active: Boolean,
      },
    ],
    quickReplies: [String],
    isEnabled: { type: Boolean, default: true },
    updatedBy: { type: String, default: "Master Admin" },
  },
  { timestamps: true }
);

export const AiSettings: Model<IAiSettings> =
  mongoose.models.AiSettings || mongoose.model<IAiSettings>("AiSettings", AiSettingsSchema);
