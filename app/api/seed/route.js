import connDB from "@/config/db";
import Product from "@/models/Product";
import User from "@/models/User";
import { NextResponse } from "next/server";

// TEMPORARY seed route - deleted after initial seeding
const SEED_SECRET = "s33d-c4p1t-9x7q2";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("secret") !== SEED_SECRET) {
        return NextResponse.json({ success: false, message: "forbidden" }, { status: 403 });
    }
    try {
        await connDB();
        const users = await User.find({}, { _id: 1 }).limit(5);
        const sellerId = users.length > 0 ? users[0]._id : "seed_seller";
        const BASE = "https://capit-store-three.vercel.app/products";
        const now = Date.now();
        const products = [
            { name: "Sandal Jepit Swallow Classic", description: "Sandal jepit legendaris bahan karet berkualitas, nyaman dipakai harian. Anti slip dan tahan lama.", price: 25000, offerPrice: 20000, image: [`${BASE}/pink_swallow_image.png`], category: "Sandal Jepit", stock: 100 },
            { name: "Sandal Crocs Pink Casual", description: "Sandal casual model crocs warna pink, ringan dan empuk. Cocok untuk santai maupun jalan-jalan.", price: 149000, offerPrice: 129000, image: [`${BASE}/crocs_pink_image.png`], category: "Sandal Casual", stock: 50 },
            { name: "Sandal Flip Flop Biru", description: "Sandal flip flop warna biru dengan sol tebal yang nyaman. Desain simpel cocok untuk semua acara santai.", price: 75000, offerPrice: 65000, image: [`${BASE}/blue_flop_shoes_image.png`], category: "Sandal Jepit", stock: 75 },
            { name: "Sandal Lurad Premium", description: "Sandal premium bahan pilihan dengan jahitan rapi. Tampil elegan untuk acara formal maupun kasual.", price: 120000, offerPrice: 99000, image: [`${BASE}/lurad_sandal_image.png`], category: "Sandal Casual", stock: 40 },
            { name: "Sandal Gunung Swallow Ndaweg", description: "Sandal gunung tangguh dengan grip kuat, siap menemani petualangan outdoor. Sol anti slip.", price: 95000, offerPrice: 85000, image: [`${BASE}/swallow_ndaweg_image.png`], category: "Sandal Gunung", stock: 60 },
            { name: "Sandal Jepit Swallow Pink", description: "Varian warna pink dari sandal jepit Swallow favorit. Ceria dan tetap nyaman dipakai seharian.", price: 30000, offerPrice: 25000, image: [`${BASE}/pink_swallow_image.png`], category: "Sandal Jepit", stock: 90 },
        ];
        const docs = products.map((p) => ({ ...p, userId: sellerId, date: now }));
        await Product.deleteMany({ userId: sellerId, name: { $in: products.map((p) => p.name) } });
        const inserted = await Product.insertMany(docs);
        return NextResponse.json({ success: true, inserted: inserted.length, sellerId });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
