import { NextResponse } from "next/server";
import { collections } from "@/app/lib/db";
import { verifyAdmin, unauthorizedResponse } from "@/app/lib/auth";

// GET - fetch all blogs with pagination
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const search = searchParams.get("search") || "";
    const slug = searchParams.get("slug") || "";

    if (slug) {
      // Fetch single blog by slug
      const allBlogs = await collections.blogs.getAll();
      const blog = allBlogs.find((b) => b.slug === slug);
      if (!blog) {
        return NextResponse.json(
          { success: false, message: "Blog not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: blog });
    }

    const result = await collections.blogs.getPaginated(page, pageSize, search);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// POST - create a new blog
export async function POST(request) {
  if (!verifyAdmin(request)) return unauthorizedResponse();

  try {
    const body = await request.json();
    const { title, description, content, slug, coverUrl } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: "Title and content are required" },
        { status: 400 }
      );
    }

    const newBlog = await collections.blogs.create({
      title,
      description: description || "",
      content,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      coverUrl: coverUrl || "",
    });

    return NextResponse.json({
      success: true,
      data: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// PUT - update a blog
export async function PUT(request) {
  if (!verifyAdmin(request)) return unauthorizedResponse();

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const updatedBlog = await collections.blogs.update(id, updates);

    return NextResponse.json({
      success: true,
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// DELETE - delete a blog
export async function DELETE(request) {
  if (!verifyAdmin(request)) return unauthorizedResponse();

  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    await collections.blogs.delete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
