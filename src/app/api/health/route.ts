import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Prospera KSA Central API",
    timestamp: new Date().toISOString(),
    version: "2.4.0",
  });
}
