import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Shield,
  Eye,
  BookOpen,
  User,
  Calendar,
  Tag,
} from "lucide-react";
import connectDB from "@/lib/db";
import Blog from "@/models/blogModel";

// Force Dynamic Rendering for Fresh DB Data
export const dynamic = "force-dynamic";

// Helper function to fetch blog by slug
async function getBlogBySlug(slug) {
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug, published: true }).lean();
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

// 1. Dynamic SEO & Social Sharing Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Optiko Journal",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: blog.metaTitle || `${blog.title} | Optiko Journal`,
    description: blog.metaDescription || blog.excerpt,
    keywords: [
      blog.category,
      "optiko eyewear",
      "prescription glasses",
      "eye care tips",
    ],
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      type: "article",
      publishedTime: blog.createdAt,
      authors: [blog.author],
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
    },
  };
}

// 2. Real Single Blog Page Component
export default async function SingleBlogPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  // Trigger 404 page if blog doesn't exist
  if (!blog) {
    notFound();
  }

  // Schema.org Structured Data (JSON-LD) for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: [blog.image],
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    author: {
      "@type": "Person",
      name: blog.author || "Optiko Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Optiko Eyewear",
      logo: {
        "@type": "ImageObject",
        url: "https://optiko.com/logo.png", // Replace with your domain logo
      },
    },
  };

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      {/* Inject Google SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article Hero Banner */}
      <section className="py-14 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-neutral-400">
            <span className="bg-white text-neutral-900 px-3 py-1 rounded-full uppercase text-[10px] tracking-wider font-black">
              {blog.category}
            </span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Clock className="w-3.5 h-3.5" /> {blog.readTime || "5 min read"}
            </span>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <Calendar className="w-3.5 h-3.5" /> {formattedDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight text-white">
            {blog.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-neutral-400 pt-2 border-t border-neutral-800">
            <User className="w-4 h-4 text-neutral-400" />
            <span>
              Written by{" "}
              <strong className="text-white font-bold">
                {blog.author || "Optiko Team"}
              </strong>
            </span>
          </div>
        </div>
      </section>

      {/* Main Article Section */}
      <article className="py-16 bg-white text-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Main Article Image */}
          <div className="relative h-72 sm:h-[460px] rounded-3xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-100">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          {/* Excerpt Callout */}
          <div className="p-6 bg-neutral-50 rounded-2xl border-l-4 border-neutral-900 text-neutral-800 text-base font-semibold leading-relaxed">
            {blog.excerpt}
          </div>

          {/* Dynamic Article Body */}
          <div
            className="prose prose-neutral max-w-none text-neutral-800 space-y-6 text-sm sm:text-base leading-relaxed 
                       prose-headings:font-black prose-headings:text-neutral-900 
                       prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                       prose-p:text-neutral-700 prose-p:leading-relaxed
                       prose-a:text-neutral-900 prose-a:underline hover:prose-a:text-neutral-600
                       prose-img:rounded-2xl prose-img:border"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Article Footer Tags / Share */}
          <div className="pt-8 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-600">
              <Tag className="w-4 h-4 text-neutral-400" />
              <span>Category:</span>
              <span className="bg-neutral-100 px-3 py-1 rounded-lg text-neutral-900 font-bold">
                {blog.category}
              </span>
            </div>

            <Link
              href="/blogs"
              className="text-xs font-bold text-neutral-900 hover:underline flex items-center gap-1"
            >
              Explore More Articles →
            </Link>
          </div>
        </div>
      </article>

      {/* Trust Badges Section */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-10 h-10 mb-4 text-neutral-400" />
              <h3 className="text-xl font-bold mb-2">Lifetime Warranty</h3>
              <p className="text-neutral-400 text-sm max-w-xs">
                Every frame is guaranteed against manufacturing defects for
                life.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <BookOpen className="w-10 h-10 mb-4 text-neutral-400" />
              <h3 className="text-xl font-bold mb-2">Expert Advice</h3>
              <p className="text-neutral-400 text-sm max-w-xs">
                Guides reviewed by certified opticians and vision care
                specialists.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Eye className="w-10 h-10 mb-4 text-neutral-400" />
              <h3 className="text-xl font-bold mb-2">Free RX Lenses</h3>
              <p className="text-neutral-400 text-sm max-w-xs">
                Standard single-vision prescription lenses are free with every
                order.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
