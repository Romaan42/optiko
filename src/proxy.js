import { NextResponse } from "next/server";
import checkAdmin from "./lib/checkAdmin";
import checkUser from "./lib/checkLoginUser";

export async function proxy(request) {
  const url = request.nextUrl.clone();
  const user = await checkUser();

  const protectedRoutes = ["/checkout", "/orders", "/custom-order"];
  if (protectedRoutes.includes(url.pathname) && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Admin Route Check
  if (url.pathname.startsWith("/admin")) {
    const isAdmin = await checkAdmin();

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }

  return NextResponse.next();
}

// 3. Added /custom-order to matcher array
export const config = {
  matcher: ["/admin/:path*", "/checkout", "/orders", "/custom-order"],
};
