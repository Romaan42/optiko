import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Product from "@/models/productModel";

export async function GET(request, { params }) {
  await connectDb();
  const product = await Product.findById(params.id);
  if (!product) return NextResponse.json({ success: false }, { status: 404 });
  return NextResponse.json({ success: true, product });
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    await connectDb();
    const {
      title,
      description,
      price,
      comparePrice,
      color,
      stock,
      category,
      shape,
      sizes,
      status,
      brand,
      images,
    } = await request.json();
    const product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        brand,
        sizes: sizes.split(","),
        stock,
        images,
        isActive: status === "active" ? true : false,
        colors: color,
        category,
      },
      {
        new: true,
      },
    );
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}

export async function DELETE(request, { params }) {
  await connectDb();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
