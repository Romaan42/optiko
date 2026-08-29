import checkUser from "@/lib/checkLoginUser";
import connectDb from "@/lib/db";
import Order from "@/models/orderModel";
import Product from "@/models/productModel";

export const GET = async () => {
  try {
    await connectDb();
    const user = await checkUser();
    if (!user) {
      return Response.json(
        { success: false, message: "please login first!" },
        { status: 404 },
      );
    }
    const orders = await Order.find({ user: user._id }).sort({
      createdAt: -1,
    });

    // const orders = ordersFromDb.map((order) => ({
    //   _id: order._id,
    //   status: order.status,
    //   totalAmount: order.totalAmount,
    //   createdAt: order.createdAt,
    //   paymentMethod: order.paymentMethod,
    //   items: order.orderItems.map((item) => ({
    //     _id: item.product?._id,
    //     title: item.product?.title,
    //     slug: item.product?.slug,
    //     category: item.product?.category,
    //     shape: item.product?.shape,
    //     price: item.price, // Order ke waqt ka price
    //     quantity: item.quantity,
    //     image: item.product?.images?.[0] || "", // Pehli image safe access
    //   })),
    // }));
    return Response.json({ success: true, orders });
  } catch (error) {
    console.log("ERROR", error);
    return Response.json(
      { success: false, message: "server error" },
      { status: 500 },
    );
  }
};
