import checkUser from "@/lib/checkLoginUser";
import connectDb from "@/lib/db";
import Cart from "@/models/cartModel";

export const POST = async (request) => {
  try {
    await connectDb();
    const user = await checkUser();

    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { items } = await request.json();

    if (items.length === 0) {
      return Response.json({ success: false, message: "Cart is empty" });
    }

    await Cart.deleteMany({ userId: user._id });
    await Cart.insertMany(items);
    return Response.json({
      success: true,
      message: "cart item sync succeffully",
    });
  } catch (error) {
    return Response.json({ success: false, message: "something went wrong!" });
  }
};
