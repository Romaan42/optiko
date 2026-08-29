import connectDb from "@/lib/db";
import Order from "@/models/orderModel";

export async function GET() {
  try {
    await connectDb();
    const orders = await Order.find();
    const [result] = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" }, // totalAmount ko sum karo
        },
      },
    ]);
    const revenue = result?.totalRevenue ?? 0;
    return Response.json({ success: true, orders, revenue });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "something went wrong!" },
      { status: 500 },
    );
  }
}
