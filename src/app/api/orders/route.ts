import { NextResponse } from "next/server";
import { initialOrders } from "@/data/initialData";
import { Order } from "@/lib/types/orderTypes";

let inMemoryOrders: Order[] = [...initialOrders];

export async function GET() {
  return NextResponse.json({
    success: true,
    orders: inMemoryOrders,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderNumber = body.orderNumber || `PR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...body,
      id: orderNumber,
      orderNumber,
      createdAt: body.createdAt || new Date().toISOString(),
      status: body.status || "Pending Processing",
    };
    inMemoryOrders.unshift(newOrder);
    return NextResponse.json({ success: true, order: newOrder });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
