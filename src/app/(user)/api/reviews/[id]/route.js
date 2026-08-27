import connectDb from "@/lib/db";
import Reviews from "@/models/reviewsModel";

export const GET = async (_, params) => {
  try {
    await connectDb();
    const { id } = await params;
    const reviews = await Reviews.find({ product: id });
    if (!reviews) {
      return Response.json(
        { success: false, message: "reviews not found!" },
        { status: 404 },
      );
    }

    return Response.json({ success: true, reviews });
  } catch (error) {
    return Response.json(
      { success: false, message: "something went wrong!" },
      { status: 500 },
    );
  }
};
