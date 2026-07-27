import checkUser from "@/lib/checkLoginUser";
import connectDb from "@/lib/db";
import Cart from "@/models/cartModel";

export const GET = async () => {
  try {
    await connectDb();
    const user = await checkUser();
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "user doesn't logged in",
        },
        {
          status: 404,
        },
      );
    }

    const data = await Cart.find({ userId: user._id }).populate("productId");

    const cartItems = data.map((product) => {
      const productData = product.productId.toObject();
      const finalData = {
        _id: product._id,
        title: productData.title,
        price: productData.price,
        images: productData.images,
        brand: productData.brand,
        qty: product.qty,
      };
      return finalData;
    });

    return Response.json({ success: true, cartItems });
  } catch (error) {
    return Response.json({ success: false, message: "something went wrong" });
  }
};
