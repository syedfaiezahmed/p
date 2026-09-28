import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  serviceId: string;
  title: string;
  slug: string;
  category: string;
  categorySlug?: string;
  tagline?: string;
  shortDescription: string;
  fullDescription: string | string[];
  deliverables?: string[];
  coreDeliverables?: string[];
  keyBenefits?: Array<{ title: string; description: string }>;
  methodology?: Array<{ step: string; title: string; description: string }>;
  targetAudience?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  relatedSlugs?: string[];
  engagementDuration?: string;
  pricingTier?: string;
  featured: boolean;
  active: boolean;
  image?: string;
  heroImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

const ServiceSchema = new Schema<IService>(
  {
    serviceId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      default: "Financial Services",
    },
    categorySlug: {
      type: String,
      default: "financial",
    },
    tagline: {
      type: String,
      default: "",
    },
    shortDescription: {
      type: String,
      default: "",
    },
    fullDescription: {
      type: Schema.Types.Mixed,
      default: "",
    },
    deliverables: {
      type: [String],
      default: [],
    },
    coreDeliverables: {
      type: [String],
      default: [],
    },
    keyBenefits: {
      type: [
        {
          title: String,
          description: String,
        },
      ],
      default: [],
    },
    methodology: {
      type: [
        {
          step: String,
          title: String,
          description: String,
        },
      ],
      default: [],
    },
    targetAudience: {
      type: [String],
      default: [],
    },
    faqs: {
      type: [
        {
          question: String,
          answer: String,
        },
      ],
      default: [],
    },
    relatedSlugs: {
      type: [String],
      default: [],
    },
    engagementDuration: {
      type: String,
      default: "Monthly Retainer",
    },
    pricingTier: {
      type: String,
      default: "Custom Quote",
    },
    featured: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: "/images/hero image.jpg",
    },
    heroImage: {
      type: String,
      default: "/images/hero image.jpg",
    },
  },
  { timestamps: true }
);

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
