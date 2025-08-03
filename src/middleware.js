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

  // إذا لم يكن هناك مسار محمي، واصل الطلب
  if (!matchedRoute) return NextResponse.next();

  // إذا كان المسار /login أو /register ولا يوجد accessToken، اسمح بالوصول
  if (
    (matchedRoute.path === "/login" || matchedRoute.path === "/register") &&
    !accessToken
  ) {
    return NextResponse.next();
  }

  // إذا كان هناك accessToken ويحاول الوصول إلى /login أو /register، اعمل redirect للرئيسية
  if (
    (matchedRoute.path === "/login" || matchedRoute.path === "/register") &&
    accessToken
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // إذا لم يكن هناك accessToken لمسار محمي، اعمل redirect لـ /login
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // تحقق من صلاحية الـ accessToken ودور المستخدم
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = res.data.user;

    // تحقق من أدوار المستخدم إذا كان المسار يتطلب أدوار معينة
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
    "/login",
    "/register",
    "/dashboard",
    "/dashboard/:path*",
  ],
};