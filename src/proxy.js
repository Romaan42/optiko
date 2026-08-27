import { NextResponse } from "next/server";
import checkAdmin from "./lib/checkAdmin";

export async function proxy(request) {
  const url = request.nextUrl.clone();

  if (url.pathname.startsWith("/admin")) {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.redirect(
        new URL(`${process.env.BASE_URL}/admin-login`),
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
