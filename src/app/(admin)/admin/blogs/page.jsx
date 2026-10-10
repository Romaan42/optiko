"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  BookOpen,
  Clock,
  Tag,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import ProductTableSkeleton from "@/components/admin/TableLoading";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter((blog) => blog._id !== id));
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const response = await fetch("/admin/api/blogs");
      const data = await response.json();
      setLoading(false);
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error("Failed to fetch blogs:", data.message);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) return <ProductTableSkeleton />;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6" /> Blog Management
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Create, edit, and optimize eye care articles & styling guides for
            SEO.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
        >
          <Plus className="w-4 h-4" /> Add New Article
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title or category..."
            className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:border-neutral-900 focus:bg-white"
          />
        </div>
      </div>

      {/* Blogs Table / List */}
      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-700">
            <thead className="bg-neutral-50 border-b border-neutral-200 uppercase tracking-wider text-[10px] text-neutral-400 font-black">
              <tr>
                <th className="py-3.5 px-4">Article</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredBlogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="hover:bg-neutral-50/80 transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-neutral-900">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-neutral-100 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-neutral-900 text-xs">
                            {blog.title}
                          </span>
                          {blog.featured && (
                            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-black rounded uppercase">
                              Featured
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-neutral-400 font-mono font-normal block mt-0.5">
                          /blogs/{blog.slug}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-neutral-100 text-neutral-800 font-bold px-2.5 py-1 rounded-md text-[10px]">
                      {blog.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-neutral-600">
                    {blog.author}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-neutral-500">
                    {blog.publishedAt}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        target="_blank"
                        className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg transition-colors"
                        title="View Live Article"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/blogs/edit/${blog._id}`}
                        className="p-1.5 text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
