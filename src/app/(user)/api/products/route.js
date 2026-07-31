import connectDb from "@/lib/db";
import Product from "@/models/productModel";

export const GET = async () => {
  await connectDb();
  try {
    const data = await Product.find();

    return Response.json({ success: true, products: data });
  } catch (error) {
    console.log("error", error);
    return Response.json(
      { success: false, message: "server error" },
      { status: 500 },
    );
  }
};
