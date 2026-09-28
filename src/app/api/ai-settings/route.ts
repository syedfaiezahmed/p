import { NextResponse } from "next/server";
import { initialAiSettings } from "@/data/initialData";
import { AiSettingsState } from "@/lib/types/productTypes";
import { connectToDatabase } from "@/lib/db";
import { AiSettings } from "@/lib/models/AiSettings";

let inMemoryAiSettings: AiSettingsState = { ...initialAiSettings };

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      const found = await AiSettings.findOne().sort({ updatedAt: -1 }).lean();
      if (found) {
        return NextResponse.json({ success: true, settings: found });
      }
    }
  } catch (err) {
    console.warn("MongoDB fetch AI settings error:", err);
  }

  return NextResponse.json({
    success: true,
    settings: inMemoryAiSettings,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    inMemoryAiSettings = {
      ...inMemoryAiSettings,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    try {
      const db = await connectToDatabase();
      if (db) {
        const saved = await AiSettings.findOneAndUpdate(
          {},
          { $set: inMemoryAiSettings },
          { upsert: true, new: true }
        );
        return NextResponse.json({ success: true, settings: saved });
      }
    } catch (dbErr) {
      console.warn("MongoDB update AI settings error:", dbErr);
    }

    return NextResponse.json({ success: true, settings: inMemoryAiSettings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
