import { NextResponse } from "next/server";
import { initialProducts } from "@/data/initialData";
import { Product } from "@/lib/types/productTypes";

let inMemoryProducts: Product[] = [...initialProducts];

export async function GET() {
  return NextResponse.json({
    success: true,
    products: inMemoryProducts,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newId = body.id || Date.now();
    const newProduct: Product = {
      ...body,
      id: newId,
    };
    inMemoryProducts.unshift(newProduct);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const index = inMemoryProducts.findIndex((p) => String(p.id) === String(body.id));
    if (index !== -1) {
      inMemoryProducts[index] = { ...inMemoryProducts[index], ...body };
      return NextResponse.json({ success: true, product: inMemoryProducts[index] });
    } else {
      inMemoryProducts.unshift(body);
      return NextResponse.json({ success: true, product: body });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }
    inMemoryProducts = inMemoryProducts.filter((p) => String(p.id) !== String(id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
