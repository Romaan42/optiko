import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Order from "@/models/orderModel";

export async function GET(request, { params }) {
  try {
    await connectDb();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Order ID zaroori hai" },
        { status: 400 },
      );
    }

    const order = await Order.findById(id).populate("user");

    if (!order) {
      return NextResponse.json({ message: "order not found" }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error("error while fetching order:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDb();
    const { id } = await params;
    const body = await request.json();

    const { orderStatus, paymentStatus } = body;

    await Order.findByIdAndUpdate(id, {
      paymentStatus,
      deliveryStatus: orderStatus,
    });

    return NextResponse.json({
      success: true,
      message: "order updated success! ",
    });
  } catch (error) {
    console.error("Order update karne mai error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}
