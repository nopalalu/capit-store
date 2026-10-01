import connDB from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// GET: Ambil 1 produk
export async function GET(req, { params }) {
  await connDB();
  const product = await Product.findById(params.id);
  return NextResponse.json({ success: true, product });
}

// PUT: Update produk
export async function PUT(req, { params }) {
  await connDB();
  const data = await req.json();

  // Buat objek update hanya dengan field yang dikirim
  const updateFields = {};
  if (data.name !== undefined) updateFields.name = data.name;
  if (data.description !== undefined) updateFields.description = data.description;
  if (data.category !== undefined) updateFields.category = data.category;
  if (data.price !== undefined) updateFields.price = Number(data.price);
  if (data.offerPrice !== undefined) updateFields.offerPrice = Number(data.offerPrice);
  if (data.stock !== undefined) updateFields.stock = Number(data.stock); // ✅ tambahkan ini

  const updatedProduct = await Product.findByIdAndUpdate(params.id, updateFields, {
    new: true,
  });

  return NextResponse.json({ success: true, product: updatedProduct });
}


// DELETE: Hapus produk
export async function DELETE(req, { params }) {
  await connDB();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
