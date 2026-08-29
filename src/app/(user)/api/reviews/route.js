import checkUser from "@/lib/checkLoginUser";
import connectDb from "@/lib/db";
import Reviews from "@/models/reviewsModel";

export const POST = async (request) => {
  try {
    const { comment, productId, rating } = await request.json();
    await connectDb();
    const user = await checkUser();
    if (!user) {
      return Response.json(
        { success: false, message: "please login first" },
        { status: 404 },
      );
    }

    const review = await Reviews.create({
      user: user._id,
      comment,
      product: productId,
      rating,
    });

    return Response.json({
      success: true,
      message: "review submit successfuly",
      review,
    });
  } catch (error) {
    console.log("ERROR", error);
    return Response.json(
      { success: false, message: "server error" },
      { status: 500 },
    );
  }
};
