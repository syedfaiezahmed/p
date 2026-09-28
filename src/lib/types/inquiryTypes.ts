export type InquiryStatus =
  | "New"
  | "Contacted"
  | "Meeting Scheduled"
  | "Proposal Sent"
  | "Active Client"
  | "Archived";

export interface InquiryItem {
  id?: string;
  _id?: string;
  inquiryNumber: string;
  firstName: string;
  lastName?: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  status: InquiryStatus;
  notes?: string;
  adminSeen?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceMethodologyStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ConsultingService {
  id: string | number;
  _id?: string;
  serviceId?: string;
  title: string;
  slug: string;
  category: string;
  categorySlug?: "financial" | "digital";
  tagline?: string;
  shortDescription: string;
  fullDescription: string | string[];
  deliverables?: string[];
  coreDeliverables?: string[];
  keyBenefits?: ServiceBenefit[];
  methodology?: ServiceMethodologyStep[];
  targetAudience?: string[];
  faqs?: ServiceFaq[];
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

export interface ConsultingBanner {
  title: string;
  subtitle: string;
  linkUrl: string;
  imageUrl?: string;
  active: boolean;
  updatedAt?: string;
}
