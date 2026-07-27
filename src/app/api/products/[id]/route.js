import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Product from "@/models/productModel";

export async function GET(request, { params }) {
  try {
    const { id } = await params; // <-- yahan await lagao
    await connectDb();
    console.log(id);
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.log("PRODUCT API ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}
