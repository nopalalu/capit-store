import connDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { cartData } = await request.json();
    await connDB();
    let user = await User.findById(userId);
    if (!user) {
      // User exists in Clerk but not yet in DB; create a minimal record
      user = await User.create({ _id: userId, name: "User", email: "", imageUrl: "" });
    }
    user.cartItems = cartData;
    await user.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
