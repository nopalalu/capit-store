import connDB from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// Kurangi stok produk setelah checkout.
// Body: { items: [{ productId: "...", quantity: 1 }] }
export async function POST(request) {
  try {
    await connDB();
    const { items } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid data" });
    }

    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }, // langsung kurangi stok
        { new: true }
      );
    }

    return NextResponse.json({ success: true, message: "Stock updated" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
