import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("isAuthenticated");
  const isAuthenticated = cookie?.value === "true";

  if (request.nextUrl.pathname === "/dashboard") {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
matcher: ["/dashboard"],
};
