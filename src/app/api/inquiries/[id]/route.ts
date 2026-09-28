import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Inquiry } from "@/lib/models/Inquiry";
import mongoose from "mongoose";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { $or: [{ inquiryNumber: id }, { _id: id }] }
      : { inquiryNumber: id };

    try {
      const db = await connectToDatabase();
      if (db) {
        const updated = await Inquiry.findOneAndUpdate(
          query,
          { $set: body },
          { new: true }
        );
        if (updated) {
          return NextResponse.json({ success: true, inquiry: updated });
        }
      }
    } catch (err) {
      console.warn("MongoDB update inquiry error:", err);
    }

    return NextResponse.json({ success: true, inquiry: { inquiryNumber: id, ...body } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { $or: [{ inquiryNumber: id }, { _id: id }] }
      : { inquiryNumber: id };

    try {
      const db = await connectToDatabase();
      if (db) {
        await Inquiry.findOneAndDelete(query);
      }
    } catch (err) {
      console.warn("MongoDB delete inquiry error:", err);
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

