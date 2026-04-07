import { NextResponse } from "next/server";
import { collections } from "@/app/lib/github-db";
import { verifyAdmin, unauthorizedResponse } from "@/app/lib/auth";

export const dynamic = 'force-dynamic';

// Map destination slugs to collection names
const destinationMap = {
  istanbul: "istanbul",
  dubai: "dubai",
  azerbaijan: "azerbaijan",
  usa: "usa",
  saudi: "saudi",
  uk: "uk",
};

// GET - Fetch registrations for a specific destination
export async function GET(request, { params }) {
  if (!verifyAdmin(request)) return unauthorizedResponse();

  try {
    const { destination } = await params;
    const collection = collections[destinationMap[destination]];

    if (!collection) {
      return NextResponse.json(
        { success: false, message: "Invalid destination" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const search = searchParams.get("search") || "";

    const result = await collection.getPaginated(page, pageSize, search);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a registration
export async function DELETE(request, { params }) {
  if (!verifyAdmin(request)) return unauthorizedResponse();

  try {
    const { destination } = await params;
    const collection = collections[destinationMap[destination]];

    if (!collection) {
      return NextResponse.json(
        { success: false, message: "Invalid destination" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    await collection.delete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting registration:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
