import connectDb from "@/lib/db";
import Order from "@/models/orderModel";

export async function GET(request) {
  try {
    await connectDb();
    const orders = await Order.find().countDocuments();
    const result = await Order.aggregate([
      {
        $group: {
          totalRevenue: { $sum: "$totalPrice" }, // totalAmount ko sum karo
        },
      },
    ]);

    console.log(result);

    return Response.json({ orders });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "something went wrong!" },
      { status: 500 },
    );
  }
}
