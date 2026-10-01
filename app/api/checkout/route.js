import Product from "@/models/Product";

// asumsi `req.body.items` isinya seperti: [{ productId: "...", quantity: 1 }]
const { items } = await req.json();

for (const item of items) {
    await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }, // langsung kurangi stok
        { new: true }
    );
}
