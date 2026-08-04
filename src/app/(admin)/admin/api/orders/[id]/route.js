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
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const { orderStatus, paymentStatus, isDelivered, isPaid } = body;

    const existingOrder = await Order.findById(id);

    if (!existingOrder) {
      return NextResponse.json({ message: "Order nahi mila" }, { status: 404 });
    }

    // Dynamic update object
    const updateData = {};

    // Order status management
    if (orderStatus !== undefined) {
      updateData.orderStatus = orderStatus;

      if (orderStatus === "delivered") {
        updateData.isDelivered = true;
        updateData.deliveredAt = existingOrder.deliveredAt || new Date();
      } else if (orderStatus === "cancelled") {
        updateData.isDelivered = false;
      }
    }

    // Payment status management
    if (paymentStatus !== undefined) {
      updateData.paymentStatus = paymentStatus;

      if (paymentStatus === "paid") {
        updateData.isPaid = true;
        updateData.paidAt = existingOrder.paidAt || new Date();
      } else if (paymentStatus === "pending" || paymentStatus === "refunded") {
        updateData.isPaid = false;
      }
    }

    // Manual flags setup (agar frontend se directly pass hoon)
    if (isDelivered !== undefined) {
      updateData.isDelivered = isDelivered;
      if (isDelivered && !existingOrder.deliveredAt) {
        updateData.deliveredAt = new Date();
      }
    }

    if (isPaid !== undefined) {
      updateData.isPaid = isPaid;
      if (isPaid && !existingOrder.paidAt) {
        updateData.paidAt = new Date();
      }
    }

    // Mongoose update query
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    ).populate("user", "name email image phone");

    return NextResponse.json(
      {
        message: "Order kamyabi se update ho gaya",
        order: updatedOrder,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Order update karne mai error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}
