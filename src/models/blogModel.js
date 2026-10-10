import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Article title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: [true, "Short summary/excerpt is required"],
      maxlength: [300, "Excerpt cannot exceed 300 characters"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Article content is required"],
    },
    category: {
      type: String,
      required: true,
      default: "Frame Styling",
    },
    author: {
      type: String,
      default: "Admin",
      trim: true,
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
    image: {
      type: String,
      required: [true, "Featured image URL is required"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    // SEO Fields
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Auto-creates createdAt and updatedAt
  },
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
export default Blog;
