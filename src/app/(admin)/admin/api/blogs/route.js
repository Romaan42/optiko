import { NextResponse } from "next/server";
import connectDB from "@/lib/db"; // Path to your MongoDB connection helper
import Blog from "@/models/blogModel";

// GET: Fetch all blogs (Admin view)
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, count: blogs.length, blogs },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

// POST: Create a new blog post
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const {
      title,
      slug,
      excerpt,
      content,
      category,
      author,
      readTime,
      image,
      featured,
      metaTitle,
      metaDescription,
    } = body;

    // Basic Validation
    if (!title || !slug || !excerpt || !content || !image) {
      return NextResponse.json(
        { success: false, error: "Required fields are missing" },
        { status: 400 },
      );
    }

    // Check existing slug
    const existingSlug = await Blog.findOne({ slug });
    if (existingSlug) {
      return NextResponse.json(
        { success: false, error: "A blog post with this slug already exists" },
        { status: 400 },
      );
    }

    const newBlog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      category,
      author: author || "Optiko Style Studio",
      readTime: readTime || "5 min read",
      image,
      featured: Boolean(featured),
      metaTitle: metaTitle || `${title} | Optiko Journal`,
      metaDescription: metaDescription || excerpt,
    });

    return NextResponse.json(
      { success: true, message: "Blog published successfully", blog: newBlog },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create blog" },
      { status: 500 },
    );
  }
}
