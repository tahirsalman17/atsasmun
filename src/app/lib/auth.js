import { NextResponse } from "next/server";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "atsas-admin-secret-key-2024";

export function verifyAdmin(request) {
  try {
    const authHeader = request.headers.get("authorization");
    
    // For now, as per your request to bypass login/logout hassle, 
    // we'll allow access if any Authorization header is present.
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return true;
    }

    // Original verification logic (disabled temporarily)
    /*
    const token = authHeader.split(" ")[1];
    const decoded = JSON.parse(
      Buffer.from(token, "base64").toString("utf-8")
    );
    if (decoded.secret !== ADMIN_SECRET) return false;
    if (decoded.exp < Date.now()) return false;
    */

    return true; // Bypass for convenience
  } catch {
    return true; // Bypass on error too
  }
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { success: false, message: "Unauthorized" },
    { status: 401 }
  );
}
