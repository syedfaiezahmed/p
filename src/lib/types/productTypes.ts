export type Product = {
  id: number | string;
  name: string;
  category: string;
  rating: number;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  gallery?: string[];
  description: string;
  condition?: string;
  stockCount?: number;
  inStock?: boolean;
  badge?: string;
  isDeal?: boolean;
  isDealOfTheDay?: boolean;
  dealTag?: string;
  dealExpiry?: string;
  featured?: boolean;
  serviceFeatures?: string[];
};

export type PromoBanner = {
  imageUrl: string;
  linkUrl?: string;
  title?: string;
  subtitle?: string;
  active: boolean;
  updatedAt?: string;
};

export type AiSettingsState = {
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
  storePoliciesOverride: string;
  quickReplies: string[];
  isEnabled: boolean;
  updatedBy: string;
  updatedAt?: string;
};
