import connDB from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// TEMPORARY - switch seeded product images to relative paths
const SECRET = "rel1mg-c4p1t-5t8w2";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("secret") !== SECRET) {
        return NextResponse.json({ success: false, message: "forbidden" }, { status: 403 });
    }
    try {
        await connDB();
        const mapping = {
            "Sandal Jepit Swallow Classic": "/products/swallow-classic.jpg",
            "Sandal Crocs Pink Casual": "/products/crocs-pink.jpg",
            "Sandal Flip Flop Biru": "/products/flipflop-blue.jpg",
            "Sandal Lurad Premium": "/products/lurad-premium.jpg",
            "Sandal Gunung Swallow Ndaweg": "/products/gunung-ndaweg.jpg",
            "Sandal Jepit Swallow Pink": "/products/swallow-pink.jpg",
        };
        let updated = 0;
        for (const [name, url] of Object.entries(mapping)) {
            const r = await Product.updateOne({ name }, { $set: { image: [url] } });
            updated += r.modifiedCount;
        }
        return NextResponse.json({ success: true, updated });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
