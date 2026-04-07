"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  FaArrowLeft,
  FaImage,
  FaSave,
  FaBold,
  FaItalic,
  FaHeading,
  FaListUl,
  FaCode,
  FaLink,
  FaQuoteLeft,
  FaCloudUploadAlt,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

export default function EditBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();
  const params = useParams();
  const blogId = parseInt(params.id);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api1/admin/blogs?page=1&pageSize=500`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        const blog = data.data.find((b) => b.id === blogId);
        if (blog) {
          setTitle(blog.title || "");
          setDescription(blog.description || "");
          setContent(blog.content || "");
          setCoverUrl(blog.coverUrl || "");
        } else {
          setError("Blog post not found");
        }
      }
    } catch (err) {
      setError("Failed to fetch blog post");
    } finally {
      setFetching(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api1/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setCoverUrl(data.url);
      } else {
        setError(data.message || "Failed to upload image");
        setImagePreview(null);
      }
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setCoverUrl("");
    setImagePreview(null);
  };

  const handleContentImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api1/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          const textarea = document.getElementById("blog-content");
          const start = textarea?.selectionStart || content.length;
          const newContent =
            content.substring(0, start) +
            `\n![${file.name}](${data.url})\n` +
            content.substring(start);
          setContent(newContent);
        } else {
          setError("Failed to upload image");
        }
      } catch (err) {
        setError("Failed to upload image");
      } finally {
        setUploading(false);
      }
    };
    input.click();
  };

  const insertMarkdown = (prefix, suffix = "") => {
    const textarea = document.getElementById("blog-content");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const newText =
      content.substring(0, start) +
      prefix +
      (selected || "text") +
      suffix +
      content.substring(end);
    setContent(newText);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("admin_token");
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const response = await fetch("/api1/admin/blogs", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: blogId,
          title,
          description,
          content,
          slug,
          coverUrl,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/admin/blogs");
      } else {
        setError(data.message || "Failed to update post");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading blog post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2.5 rounded-xl bg-[#0d1221] border border-[#1a2035] text-gray-400 hover:text-white hover:border-blue-500/30 transition-all"
        >
          <FaArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Post</h1>
          <p className="text-gray-500 text-sm">Update your blog post</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog post title"
            className="w-full bg-[#0d1221] border border-[#1a2035] text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder-gray-600 text-lg"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the post"
            rows={3}
            className="w-full bg-[#0d1221] border border-[#1a2035] text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder-gray-600 resize-none"
          />
        </div>

        {/* Cover Image Upload */}
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2">
            <FaImage className="inline mr-2" />
            Cover Image
          </label>

          {coverUrl || imagePreview ? (
            <div className="relative rounded-2xl overflow-hidden border border-[#1a2035] group">
              <img
                src={coverUrl || imagePreview}
                alt="Cover preview"
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                {uploading ? (
                  <div className="flex items-center gap-2 bg-[#0d1221]/90 px-4 py-2 rounded-xl">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-400"></div>
                    <span className="text-white text-sm">Uploading to Cloudinary...</span>
                  </div>
                ) : (
                  <>
                    <label className="cursor-pointer p-3 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white transition-all">
                      <FaCloudUploadAlt size={18} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="p-3 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition-all"
                    >
                      <FaTimes size={18} />
                    </button>
                  </>
                )}
              </div>

              {coverUrl && !uploading && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-emerald-600/90 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  <FaCheckCircle size={12} />
                  Cloudinary
                </div>
              )}

              {uploading && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-blue-600/90 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-white"></div>
                  Uploading...
                </div>
              )}
            </div>
          ) : (
            <label className="cursor-pointer block">
              <div className="border-2 border-dashed border-[#1a2035] rounded-2xl p-10 text-center hover:border-blue-500/40 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-all">
                  <FaCloudUploadAlt className="text-blue-400" size={28} />
                </div>
                <p className="text-white font-medium mb-1">
                  Click to upload cover image
                </p>
                <p className="text-gray-500 text-sm">
                  PNG, JPG, WebP up to 10MB • Uploaded to Cloudinary
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}

          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#1a2035]"></div>
            <span className="text-gray-600 text-xs uppercase tracking-wider">or paste URL</span>
            <div className="flex-1 h-px bg-[#1a2035]"></div>
          </div>
          <input
            type="url"
            value={coverUrl}
            onChange={(e) => {
              setCoverUrl(e.target.value);
              setImagePreview(null);
            }}
            placeholder="https://example.com/image.jpg"
            className="w-full mt-3 bg-[#0d1221] border border-[#1a2035] text-white rounded-xl py-2.5 px-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder-gray-600 text-sm"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2">
            Content * (Markdown supported)
          </label>

          <div className="flex items-center gap-1 bg-[#0d1221] border border-[#1a2035] border-b-0 rounded-t-xl px-3 py-2 flex-wrap">
            <button
              type="button"
              onClick={() => insertMarkdown("**", "**")}
              className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-[#1a2035] transition-all"
              title="Bold"
            >
              <FaBold size={14} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("*", "*")}
              className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-[#1a2035] transition-all"
              title="Italic"
            >
              <FaItalic size={14} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("## ")}
              className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-[#1a2035] transition-all"
              title="Heading"
            >
              <FaHeading size={14} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("- ")}
              className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-[#1a2035] transition-all"
              title="List"
            >
              <FaListUl size={14} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("`", "`")}
              className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-[#1a2035] transition-all"
              title="Code"
            >
              <FaCode size={14} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("[", "](url)")}
              className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-[#1a2035] transition-all"
              title="Link"
            >
              <FaLink size={14} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("> ")}
              className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-[#1a2035] transition-all"
              title="Quote"
            >
              <FaQuoteLeft size={14} />
            </button>

            <div className="w-px h-6 bg-[#1a2035] mx-1"></div>

            <button
              type="button"
              onClick={handleContentImageUpload}
              disabled={uploading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-all text-sm disabled:opacity-50"
              title="Upload Image to Content"
            >
              <FaCloudUploadAlt size={14} />
              <span className="hidden sm:inline text-xs">Insert Image</span>
            </button>
          </div>

          <textarea
            id="blog-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog post content here..."
            rows={15}
            className="w-full bg-[#0d1221] border border-[#1a2035] text-white rounded-b-xl py-3 px-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder-gray-600 font-mono text-sm resize-none"
            required
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={loading || uploading || !title || !content}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/20 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                Updating...
              </>
            ) : (
              <>
                <FaSave size={16} />
                Update Post
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl bg-[#1a2035] text-gray-400 hover:text-white transition-all font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
