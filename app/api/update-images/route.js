import connDB from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// TEMPORARY image-update route - deleted after use
const SECRET = "upd1mg-c4p1t-7z3k8";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("secret") !== SECRET) {
        return NextResponse.json({ success: false, message: "forbidden" }, { status: 403 });
    }
    try {
        await connDB();
        const BASE = "https://capit-store-three.vercel.app/products";
        const mapping = {
            "Sandal Jepit Swallow Classic": `${BASE}/swallow-classic.jpg`,
            "Sandal Crocs Pink Casual": `${BASE}/crocs-pink.jpg`,
            "Sandal Flip Flop Biru": `${BASE}/flipflop-blue.jpg`,
            "Sandal Lurad Premium": `${BASE}/lurad-premium.jpg`,
            "Sandal Gunung Swallow Ndaweg": `${BASE}/gunung-ndaweg.jpg`,
            "Sandal Jepit Swallow Pink": `${BASE}/swallow-pink.jpg`,
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
