import connectDb from "@/lib/db";
import Blog from "@/models/blogModel";

export const GET = async () => {
  try {
    await connectDb();
    const blogs = await Blog.find();
    if (!blogs) {
      return Response.json(
        { success: false, message: "blogs not found!" },
        { status: 404 },
      );
    }

    return Response.json({ success: true, blogs });
  } catch (error) {
    return Response.json(
      { success: false, message: "something went wrong!" },
      { status: 500 },
    );
  }
};
