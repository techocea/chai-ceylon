import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const adminToken = req.cookies.get("adminToken")?.value;

  if (!adminToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await jwtVerify(
      adminToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return NextResponse.next();
  } catch (err) {
    const response = NextResponse.redirect(new URL("/login", req.url));

    response.cookies.set("adminToken", "", {
      maxAge: -1,
      path: "/",
    });

    return response;
  }
}

export const config = {
  matcher: ["/control-panel/:path*"],
};
