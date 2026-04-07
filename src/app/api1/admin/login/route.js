import { NextResponse } from "next/server";

// Simple admin credentials - in production use proper auth
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "atsas@admin2024";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "atsas-admin-secret-key-2024";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create a simple token
      const token = Buffer.from(
        JSON.stringify({
          username,
          exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
          secret: ADMIN_SECRET,
        })
      ).toString("base64");

      return NextResponse.json({
        success: true,
        token,
        user: { username },
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
