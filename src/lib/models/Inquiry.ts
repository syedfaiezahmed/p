import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInquiry extends Document {
  inquiryNumber: string;
  firstName: string;
  lastName?: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  status: "New" | "Contacted" | "Meeting Scheduled" | "Proposal Sent" | "Active Client" | "Archived";
  notes?: string;
  adminSeen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    inquiryNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      default: "",
    },
    fullName: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    service: {
      type: String,
      default: "General Advisory",
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Meeting Scheduled", "Proposal Sent", "Active Client", "Archived"],
      default: "New",
    },
    notes: {
      type: String,
      default: "",
    },
    adminSeen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

InquirySchema.pre("save", function () {
  if (!this.fullName) {
    this.fullName = `${this.firstName} ${this.lastName || ""}`.trim();
  }
});

export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
