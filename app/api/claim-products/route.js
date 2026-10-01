import connDB from "@/config/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// TEMPORARY - claim seeded products to the logged-in seller
const SECRET = "cl41m-c4p1t-4b9x1";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("secret") !== SECRET) {
        return NextResponse.json({ success: false, message: "forbidden" }, { status: 403 });
    }
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ success: false, message: "login dulu di sitenya, terus buka URL ini lagi" });
        }
        await connDB();
        const r = await Product.updateMany(
            { userId: "seed_seller" },
            { $set: { userId } }
        );
        return NextResponse.json({ success: true, claimed: r.modifiedCount, userId });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
