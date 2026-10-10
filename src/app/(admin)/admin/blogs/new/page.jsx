"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Sparkles,
  Image as ImageIcon,
  UploadCloud,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";

export default function AddNewBlogPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState("");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Frame Styling",
    readTime: "5 min read",
    author: "Optiko Style Studio",
    excerpt: "",
    content: "",
    featured: false,
    metaTitle: "",
    metaDescription: "",
  });

  // Auto-generate Slug from Title
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    setForm((prev) => ({
      ...prev,
      title,
      slug: generatedSlug,
      metaTitle: `${title} | Optiko Journal`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/admin/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, image }),
      });

      if (res.ok) {
        toast.success("Blog published successfully!");
        router.push("/admin/blogs");
      } else {
        toast.error("Failed to publish blog.");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-neutral-900">
              Create New Article
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Publish new guides and SEO articles
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Publishing..." : "Publish Article"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Form Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <h2 className="text-sm font-black uppercase text-neutral-400 tracking-wider">
              Article Content
            </h2>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Title
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={handleTitleChange}
                placeholder="e.g. How to Choose the Perfect Frame for Your Face Shape"
                className="w-full py-2.5 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                URL Slug
              </label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full py-2 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-700 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Short Excerpt (Summary)
              </label>
              <textarea
                rows={2}
                required
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Brief overview of the article for blog cards..."
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Main Article Body (HTML / Markdown)
              </label>
              <textarea
                rows={10}
                required
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write the article content here..."
                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          {/* SEO Meta Data */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <h2 className="text-sm font-black uppercase text-neutral-400 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> SEO Optimization
            </h2>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) =>
                  setForm({ ...form, metaTitle: e.target.value })
                }
                className="w-full py-2 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Meta Description
              </label>
              <textarea
                rows={2}
                value={form.metaDescription}
                onChange={(e) =>
                  setForm({ ...form, metaDescription: e.target.value })
                }
                placeholder="Search engine description snippet..."
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>
          </div>
        </div>

        {/* Right Settings Column */}
        <div className="space-y-6">
          {/* Publishing Settings */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <h2 className="text-sm font-black uppercase text-neutral-900">
              Publishing Settings
            </h2>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full py-2.5 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-800 outline-none focus:border-neutral-900"
              >
                <option value="Frame Styling">Frame Styling</option>
                <option value="Lens Tech">Lens Tech</option>
                <option value="Eye Care">Eye Care</option>
                <option value="Materials">Materials</option>
                <option value="Trends">Trends</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full py-2 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Read Time
              </label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                placeholder="e.g. 5 min read"
                className="w-full py-2 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-700">
                Feature on Homepage Banner
              </span>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
                className="w-4 h-4 accent-neutral-900 rounded"
              />
            </div>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm">
            {/* Header Title */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase text-neutral-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-neutral-700" /> Article
                Banner Image
              </h2>
              {image && (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Uploaded
                </span>
              )}
            </div>

            {image !== "" && image !== null ? (
              /* Image Preview Card with Hover Overlay Actions */
              <div className="relative group rounded-xl overflow-hidden border border-neutral-200 bg-neutral-900 aspect-video shadow-inner">
                <img
                  src={image}
                  alt="Blog Banner Preview"
                  className="w-full h-full object-cover group-hover:opacity-60 transition-all duration-300"
                />

                {/* Hover Action Controls using working CldUploadWidget */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 bg-neutral-900/40 backdrop-blur-[2px]">
                  <CldUploadWidget
                    uploadPreset="optiko"
                    options={{ multiple: false, maxFileSize: 5000000 }}
                    onSuccess={(result) => {
                      if (result?.info?.secure_url) {
                        setImage(result.info.secure_url);
                      }
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="px-3 py-2 bg-white text-neutral-900 hover:bg-neutral-100 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md transition-transform active:scale-95 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Replace
                      </button>
                    )}
                  </CldUploadWidget>

                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="px-3 py-2 bg-rose-600 text-white hover:bg-rose-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md transition-transform active:scale-95"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            ) : (
              <CldUploadWidget
                uploadPreset="optiko"
                options={{ multiple: false, maxFileSize: 5000000 }}
                onSuccess={(result) => {
                  if (result?.info?.secure_url) {
                    setImage(result.info.secure_url);
                  }
                }}
              >
                {({ open, isUploading }) => (
                  <div
                    onClick={() => open()}
                    className="w-full border-2 border-dashed border-neutral-200 hover:border-neutral-900 bg-neutral-50 hover:bg-neutral-100/60 rounded-xl p-8 transition-all flex flex-col items-center justify-center gap-3 group cursor-pointer"
                  >
                    <div className="p-3 bg-white border border-neutral-200 rounded-xl shadow-sm group-hover:scale-110 transition-transform text-neutral-800">
                      <UploadCloud className="w-5 h-5 text-neutral-700" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-neutral-800">
                        {isUploading
                          ? "Uploading..."
                          : "Click to upload banner image"}
                      </p>
                      <p className="text-[10px] text-neutral-400 font-medium mt-1">
                        PNG, JPG, WEBP up to 5MB
                      </p>
                    </div>
                  </div>
                )}
              </CldUploadWidget>
            )}

            <div className="pt-2 border-t border-neutral-100">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                Or Direct Image Link
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={form.image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full py-2 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-800 focus:outline-none focus:border-neutral-900"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
