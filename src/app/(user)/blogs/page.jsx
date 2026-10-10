import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, Eye, Shield, BookOpen, Search } from "lucide-react";

export const dynamic = "force-dynamic";

// SEO Metadata (App Router Standard)
export const metadata = {
  title: "Optiko Journal | Eye Care & Eyewear Style Guides",
  description:
    "Explore expert tips on choosing prescription glasses, frame materials, blue-light protection, and vision care from Optiko specialists.",
};

// const sampleBlogs = [
//   {
//     id: "how-to-choose-frame-for-face-shape",
//     slug: "how-to-choose-frame-for-face-shape",
//     title: "How to Choose the Perfect Frame for Your Face Shape",
//     excerpt:
//       "Round, square, or oval? Discover the frame geometries that complement your cheekbones and jawline for a natural, balanced aesthetic.",
//     category: "Frame Styling",
//     readTime: "5 min read",
//     publishedAt: "Aug 24, 2026",
//     author: "Optiko Style Studio",
//     image:
//       "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
//     featured: true,
//   },
//   {
//     id: "do-blue-light-glasses-really-work",
//     slug: "do-blue-light-glasses-really-work",
//     title: "Do Blue Light Blocking Lenses Actually Prevent Eye Strain?",
//     excerpt:
//       "Understanding how AR coatings shield your eyes from prolonged digital monitor glares and screen-induced fatigue.",
//     category: "Lens Tech",
//     readTime: "4 min read",
//     publishedAt: "Aug 18, 2026",
//     author: "Optical Team",
//     image:
//       "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800",
//     featured: false,
//   },
//   {
//     id: "acetate-vs-metal-eyeglass-frames",
//     slug: "acetate-vs-metal-eyeglass-frames",
//     title: "Italian Acetate vs Titanium: Which Frame Material Fits You Best?",
//     excerpt:
//       "Comparing the durability, weight, and allergy-friendly qualities of premium hand-polished acetate and titanium alloys.",
//     category: "Materials",
//     readTime: "3 min read",
//     publishedAt: "Jul 29, 2026",
//     author: "Materials Lab",
//     image:
//       "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800",
//     featured: false,
//   },
//   {
//     id: "5-signs-you-need-new-prescription",
//     slug: "5-signs-you-need-new-prescription",
//     title: "5 Signs It Is Time to Update Your Prescription Lenses",
//     excerpt:
//       "Experiencing frequent afternoon headaches or blurry night vision? Here are critical signs your prescription needs fine-tuning.",
//     category: "Eye Care",
//     readTime: "6 min read",
//     publishedAt: "Jul 15, 2026",
//     author: "Optiko Specialists",
//     image:
//       "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
//     featured: false,
//   },
// ];

export default async function BlogsPage() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/blogs`);

    if (!res.ok) {
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <h1>Blogs not found!</h1>
        </div>
      );
    }

    const { blogs } = await res.json();
    const featuredPost = blogs.find((b) => b.featured) || blogs[0];
    const regularPosts = blogs.filter((b) => !b.featuredPost);

    return (
      <>
        {/* Hero Header Section */}
        <section className="py-20 bg-neutral-900 text-white border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4 text-neutral-400" /> Optiko Journal
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
              Vision, Design & Style Guides
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
              Everything you need to know about choosing tailored frames, lens
              coatings, and maintaining long-term ocular health.
            </p>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-16 bg-white text-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* Featured Article Card */}
            {featuredPost && (
              <div className="bg-neutral-50 rounded-3xl border border-neutral-200/80 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 relative h-72 sm:h-96 w-full bg-neutral-200">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>

                <div className="lg:col-span-5 p-8 sm:p-10 space-y-5">
                  <div className="flex items-center gap-3 text-xs font-bold text-neutral-400">
                    <span className="bg-neutral-900 text-white px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1 text-neutral-500">
                      <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black leading-tight text-neutral-900">
                    <Link
                      href={`/blogs/${featuredPost.slug}`}
                      className="hover:text-neutral-600 transition-colors"
                    >
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="pt-3 border-t border-neutral-200/60 flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-400">
                      By {featuredPost.author}
                    </span>
                    <Link
                      href={`/blogs/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-neutral-900 hover:gap-3 transition-all"
                    >
                      Read Guide <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid Section */}
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                <h3 className="text-2xl font-black text-neutral-900 flex items-center gap-2">
                  <Eye className="w-5 h-5" /> Recent Articles
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <article
                    key={post._id}
                    className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-52 w-full bg-neutral-100">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold">
                          <span className="text-neutral-900 font-bold uppercase tracking-wider text-[10px] bg-neutral-100 px-2.5 py-1 rounded-md">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {post.readTime}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-neutral-900 line-clamp-2 hover:text-neutral-600 transition-colors">
                          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                        </h4>

                        <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-neutral-100 mt-4 flex items-center justify-between">
                      <span className="text-[11px] text-neutral-400 font-medium">
                        {post.publishedAt}
                      </span>
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="text-xs font-bold text-neutral-900 flex items-center gap-1 hover:underline"
                      >
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges Section (Exact Match with Home Page) */}
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
  } catch (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1>Blogs not found!</h1>
      </div>
    );
  }
}
