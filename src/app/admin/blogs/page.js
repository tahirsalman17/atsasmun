"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaPlus,
  FaSearch,
  FaTrash,
  FaEdit,
  FaBlog,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaTimes,
} from "react-icons/fa";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, [page, search]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        window.location.href = "/admin";
        return;
      }

      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: "10",
        search,
      });

      const response = await fetch(`/api1/admin/blogs?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        setBlogs(data.data || []);
        setPagination(data.pagination || {});
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api1/admin/blogs?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setBlogs(blogs.filter((b) => b.id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <FaBlog className="text-blue-400" />
            Blog Posts
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your blog posts and articles
          </p>
        </div>

        <Link
          href="/admin/blogs/create"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/20 text-sm font-medium"
        >
          <FaPlus size={14} />
          Create New Post
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          id="search-blogs"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search blog posts..."
          className="w-full bg-[#0d1221] border border-[#1a2035] text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder-gray-600"
        />
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-[#0d1221] border border-[#1a2035] rounded-2xl p-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading blog posts...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-[#0d1221] border border-[#1a2035] rounded-2xl p-12 text-center">
            <FaBlog className="text-gray-700 mx-auto mb-3" size={40} />
            <p className="text-gray-500 mb-4">No blog posts found</p>
            <Link
              href="/admin/blogs/create"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-500 transition-all text-sm"
            >
              <FaPlus size={12} />
              Create your first post
            </Link>
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#0d1221] border border-[#1a2035] rounded-2xl p-5 hover:border-blue-500/20 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-md text-xs font-medium">
                      Article
                    </span>
                    <span className="text-gray-600 text-xs">
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-blue-400 transition-colors">
                    {blog.title || "Untitled"}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {blog.description || "No description"}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {blog.slug && (
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all"
                      title="View Post"
                    >
                      <FaEye size={14} />
                    </Link>
                  )}
                  <Link
                    href={`/admin/blogs/edit/${blog.id}`}
                    className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all"
                    title="Edit Post"
                  >
                    <FaEdit size={14} />
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm(blog.id)}
                    className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                    title="Delete Post"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.pageCount > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm">
            Page {page} of {pagination.pageCount}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="p-2 rounded-lg bg-[#1a2035] text-gray-400 hover:text-white disabled:opacity-30 transition-all"
            >
              <FaChevronLeft size={14} />
            </button>
            <button
              onClick={() =>
                setPage(Math.min(pagination.pageCount, page + 1))
              }
              disabled={page >= pagination.pageCount}
              className="p-2 rounded-lg bg-[#1a2035] text-gray-400 hover:text-white disabled:opacity-30 transition-all"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d1221] border border-[#1a2035] rounded-2xl max-w-md w-full p-6">
            <h3 className="text-white font-bold text-lg mb-2">
              Delete Blog Post?
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              This action cannot be undone. The blog post will be permanently
              deleted.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-xl bg-[#1a2035] text-gray-400 hover:text-white transition-all text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-500 transition-all text-sm flex items-center gap-2 disabled:opacity-50"
              >
                {deleting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <FaTrash size={12} />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
