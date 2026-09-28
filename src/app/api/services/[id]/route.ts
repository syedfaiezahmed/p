import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Service } from "@/lib/models/Service";
import { initialConsultingServices } from "@/lib/stores/servicesStore";
import mongoose from "mongoose";

function getServiceQuery(id: string) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { $or: [{ slug: id }, { serviceId: id }, { _id: id }] };
  }
  return { $or: [{ slug: id }, { serviceId: id }] };
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await connectToDatabase();
    if (db) {
      const found = await Service.findOne(getServiceQuery(id)).lean();

      if (found) {
        return NextResponse.json({
          success: true,
          service: { ...found, id: (found as any).serviceId || (found as any)._id },
        });
      }
    }

    const fallback = initialConsultingServices.find(
      (s) => s.slug === id || String(s.id) === String(id)
    );
    if (fallback) {
      return NextResponse.json({ success: true, service: fallback });
    }

    return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    try {
      const db = await connectToDatabase();
      if (db) {
        const updated = await Service.findOneAndUpdate(
          getServiceQuery(id),
          { $set: body },
          { new: true }
        );

        if (updated) {
          return NextResponse.json({
            success: true,
            service: { ...updated.toObject(), id: updated.serviceId || updated._id },
          });
        }
      }
    } catch (err) {
      console.warn("MongoDB update service error:", err);
    }

    return NextResponse.json({
      success: true,
      service: { id, ...body },
    });
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
    try {
      const db = await connectToDatabase();
      if (db) {
        await Service.findOneAndDelete(getServiceQuery(id));
      }
    } catch (err) {
      console.warn("MongoDB delete service error:", err);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

