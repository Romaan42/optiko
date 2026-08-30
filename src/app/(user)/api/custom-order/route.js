import checkUser from "@/lib/checkLoginUser";
import connectDb from "@/lib/db";
import CustomOrder from "@/models/customOrderModel";

export const POST = async (request) => {
  try {
    await connectDb();
    const { frame, lens, customerAddress, totalPrice } = await request.json();
    const user = await checkUser();
    if (!user) {
      return Response.json(
        { success: false, message: "please login first" },
        { status: 401 },
      );
    }
    const order = await CustomOrder.create({
      customer: customerAddress,
      frame,
      lens: {
        id: lens.id,
        name: lens.name,
        image: lens.image,
        price: lens.price,
      },
      totalPrice,
    });
    return Response.json({
      success: true,
      message: "order placed successfully!",
      order,
    });
  } catch (error) {
    console.log("ERROR", error);
    return Response.json(
      { success: false, message: "error while placing order" },
      { status: 500 },
    );
  }
};
