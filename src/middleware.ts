import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";

const protectedRoutes = [
  "/",
  "/orders",
  "/products",
  "/shop-profile",
  "/settings",
];
const publicRoutes = ["/auth/signin"];

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

async function isAuthenticated(request: NextRequest) {
  try {
    const token = request.cookies.get("access_token")?.value;
    if (!token) return false;

    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded?.role === "vendor";
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const authenticated = await isAuthenticated(request);

  if (isPublicRoute && authenticated) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isProtectedRoute && !authenticated) {
    const signInUrl = new URL("/auth/signin", request.nextUrl);
    signInUrl.searchParams.set("callbackUrl", path);

    return new NextResponse(null, {
      status: 307, // Force reload
      headers: { Location: signInUrl.toString() },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/orders",
    "/products",
    "/shop-profile",
    "/settings",
    "/auth/signin",
  ],
};
