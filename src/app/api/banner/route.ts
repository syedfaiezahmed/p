import { NextResponse } from "next/server";
import { initialBanner } from "@/data/initialData";
import { PromoBanner } from "@/lib/types/productTypes";
import { connectToDatabase } from "@/lib/db";
import { Banner } from "@/lib/models/Banner";

let inMemoryBanner: PromoBanner = { ...initialBanner };

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      const found = await Banner.findOne().sort({ updatedAt: -1 }).lean();
      if (found) {
        return NextResponse.json({ success: true, banner: found });
      }
    }
  } catch (err) {
    console.warn("MongoDB fetch banner error:", err);
  }

  return NextResponse.json({
    success: true,
    banner: inMemoryBanner,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    inMemoryBanner = {
      ...inMemoryBanner,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    try {
      const db = await connectToDatabase();
      if (db) {
        const saved = await Banner.findOneAndUpdate(
          {},
          { $set: inMemoryBanner },
          { upsert: true, new: true }
        );
        return NextResponse.json({ success: true, banner: saved });
      }
    } catch (dbErr) {
      console.warn("MongoDB update banner error:", dbErr);
    }

    return NextResponse.json({ success: true, banner: inMemoryBanner });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
