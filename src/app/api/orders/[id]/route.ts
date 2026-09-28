import { NextResponse } from "next/server";
import { initialOrders } from "@/data/initialData";
import { Order } from "@/lib/types/orderTypes";

let inMemoryOrders: Order[] = [...initialOrders];

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const index = inMemoryOrders.findIndex((o) => o.orderNumber === id || o.id === id);

    if (index !== -1) {
      inMemoryOrders[index] = { ...inMemoryOrders[index], ...body };
      return NextResponse.json({ success: true, order: inMemoryOrders[index] });
    }

    return NextResponse.json({ success: true, order: { id, ...body } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
