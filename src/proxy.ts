
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

export async function proxy(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    const user = session?.user;

    // User login na thakle sign-in page-e pathabe
    if (!user) {
      const signInUrl = new URL("/auth/sign-in", request.url);

      // Login-er por ager page-e fire jawar jonno
      signInUrl.searchParams.set(
        "callbackURL",
        request.nextUrl.pathname + request.nextUrl.search
      );

      return NextResponse.redirect(signInUrl);
    }

    // User login thakle requested page access korte parbe
    return NextResponse.next();
  } catch (error) {
    console.error("Proxy authentication error:", error);

    return NextResponse.redirect(
      new URL("/auth/sign-in", request.url)
    );
  }
}

export const config = {
  matcher: [
    "/studios/:id",
    "/studios/edit/:path*",
    "/add-studio/:path*",
    "/my-listings/:path*",
    "/my-bookings/:path*",
  ],
};
