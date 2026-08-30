import connectDb from "@/lib/db";
import CustomOrder from "@/models/customOrderModel";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const { id } = await params;
    const order = await CustomOrder.findById(id);
    if (!order) {
      return NextResponse.json(
        { success: false, message: "order not found!" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error) {
    console.log("ERROR", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch custom order details" },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const { deliveryStatus, labStatus, paymentStatus, trx, adminNotes } =
      await request.json();

    await connectDb();
    const updatedOrder = await CustomOrder.findByIdAndUpdate(
      id,
      {
        deliveryStatus,
        paymentStatus,
        trx,
        adminNotes,
      },
      {
        new: true,
      },
    );

    return NextResponse.json(
      { message: "Custom order updated successfully", updatedOrder },
      { status: 200 },
    );
  } catch (error) {
    console.log("ERROR", error);
    return NextResponse.json(
      { error: "Failed to update custom order" },
      { status: 500 },
    );
  }
}
