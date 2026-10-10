"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles, Image as ImageIcon } from "lucide-react";

export default function EditBlogPage({ params }) {
  const resolvedParams = use(params);
  const blogId = resolvedParams.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Frame Styling",
    readTime: "5 min read",
    author: "",
    image: "",
    excerpt: "",
    content: "",
    featured: false,
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    // Mock fetch blog details for editing
    const fetchBlog = async () => {
      try {
        setLoading(true);
        // Replace with actual API call:
        // const res = await fetch(`/admin/api/blogs/${blogId}`);
        // const data = await res.json();

        // Demo populated data:
        setForm({
          title: "How to Choose the Perfect Frame for Your Face Shape",
          slug: "how-to-choose-frame-for-face-shape",
          category: "Frame Styling",
          readTime: "5 min read",
          author: "Optiko Style Studio",
          image:
            "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
          excerpt:
            "Round, square, or oval? Discover frame geometries that complement your face.",
          content: "Full article body content goes here...",
          featured: true,
          metaTitle: "How to Choose Frame | Optiko Journal",
          metaDescription:
            "Complete guide on finding the right frames for your face shape.",
        });
      } catch (err) {
        console.error("Failed to load blog:", err);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) fetchBlog();
  }, [blogId]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch(`/admin/api/blogs/${blogId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Blog updated successfully!");
        router.push("/admin/blogs");
      } else {
        alert("Failed to update blog.");
      }
    } catch (err) {
      console.error("Error updating blog:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-neutral-900 border-t-transparent"></div>
        <p className="text-xs font-bold text-neutral-600 mt-4">
          Loading Blog Data...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="max-w-5xl mx-auto space-y-8 pb-16">
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
              Edit Article
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">ID: {blogId}</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Title
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
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
                Short Excerpt
              </label>
              <textarea
                rows={2}
                required
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Main Content Body
              </label>
              <textarea
                rows={10}
                required
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <h2 className="text-sm font-black uppercase text-neutral-900">
              Settings
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
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Author
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full py-2 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-700">
                Featured
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
        </div>
      </div>
    </form>
  );
}
