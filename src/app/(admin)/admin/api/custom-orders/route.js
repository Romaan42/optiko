import connectDb from "@/lib/db";
import CustomOrder from "@/models/customOrderModel";

export async function GET(params) {
  await connectDb();
  const orders = await CustomOrder.find();
  return Response.json({ success: true, orders });
}
