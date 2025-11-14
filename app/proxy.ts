import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  console.log("🔥 Middleware triggered:", pathname);

  // Not logged in → redirect
  if (!token) {
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    if (
      pathname.startsWith("/client/dashboard") ||
      pathname === "/client/cource"
    ) {
      return NextResponse.redirect(new URL("/client/auth/login", req.url));
    }
  }

  if (
    token?.role === "client" &&
    !pathname.startsWith("/client/dashboard") &&
    pathname !== "/client/cource" // was "/client/cource"
  ) {
    // Only redirect to dashboard if not already on dashboard or course
    return NextResponse.redirect(new URL("/client/dashboard", req.url));
  }

  if (
    token?.role === "admin" &&
    (!pathname.startsWith("/admin") || pathname.startsWith("/admin/login"))
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/client/:path*", "/admin/:path*"],
};
