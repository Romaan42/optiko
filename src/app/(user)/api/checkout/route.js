import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import checkUser from "@/lib/checkLoginUser";
import Order from "@/models/orderModel";
import Cart from "@/models/cartModel";

export async function POST(request) {
  try {
    await connectDb();
    const user = await checkUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = body;

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 },
      );
    }

    const order = new Order({
      user: user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    await Cart.deleteMany({ userId: user._id });

    return NextResponse.json({ success: true, order: createdOrder });
  } catch (error) {
    console.log("CHECKOUT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}
