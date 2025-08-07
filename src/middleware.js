import axios from "axios";
import { NextResponse } from "next/server";

const protectedRoutes = [
  { path: "/login" },
  { path: "/register" },
  { path: "/dashboard", roles: ["admin", "seller"] },
];

export async function middleware(req) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  const matchedRoute = protectedRoutes.find((route) =>
    pathname.startsWith(route.path)
  );

  // ✅ إعادة التوجيه من "/" إلى "/dashboard" إذا كان المستخدم مسجل دخول
  if (pathname === "/" && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!matchedRoute) return NextResponse.next();

  if (
    (matchedRoute.path === "/login" || matchedRoute.path === "/register") &&
    !accessToken
  ) {
    return NextResponse.next();
  }

  if (
    (matchedRoute.path === "/login" || matchedRoute.path === "/register") &&
    accessToken
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = res.data.user;

    if (matchedRoute.roles && !matchedRoute.roles.includes(user.role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("❌ Error in middleware:", error.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}


export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/dashboard",
    "/dashboard/:path*",
  ],
};