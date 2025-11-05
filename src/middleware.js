import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  console.log("🛡️ Middleware running for:", pathname, "| Token:", token ? "Present" : "Missing");

  const isUserRoute = pathname.startsWith("/user");
  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthPage = ["/auth/login", "/auth/signup", "/admin/login"].includes(pathname);
  const isRoot = pathname === "/";

  // ✅ Skip middleware redirect for public routes (login/signup)
  if (isAuthPage) {
    return NextResponse.next();
  }

  // ✅ If no token → redirect
  if ((isUserRoute || isAdminRoute) && !token) {
    const redirectTo = isAdminRoute ? "/admin/login" : "/auth/login";
    console.log(`🔒 Not logged in → redirecting to ${redirectTo}`);
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  let user = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      user = payload;
    
    } catch (err) {
      console.log("❌ Invalid or expired token:", err.message);
      const redirectTo = isAdminRoute ? "/admin/login" : "/auth/login";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }

  // ✅ If already logged in → redirect from login/root to dashboards
  if (token && (isRoot || isAuthPage)) {
    if (user?.role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/user/:path*", "/admin/:path*", "/auth/:path*"],
};
