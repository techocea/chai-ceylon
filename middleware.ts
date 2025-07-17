// import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";
// export async function middleware(req: NextRequest) {
//   const isAdminPath = req.nextUrl.pathname.startsWith("/control-panel");

//   const adminToken = req.cookies.get("adminToken")?.value;

//   if (isAdminPath) {
//     if (!adminToken) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     try {
//       await jwtVerify(
//         adminToken,
//         new TextEncoder().encode(process.env.JWT_SECRET)
//       );
//       return NextResponse.next();
//     } catch (error) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }
// }

// export const config = {
//   matcher: ["/control-panel/:path*"],
// };
