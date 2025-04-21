import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {


  const token = await getToken({ req });
  // if(token) console.log("from middleware token", token)
  // const isTokenOk = Boolean(token)
  const isAdminUser = token?.role === "User" || token?.role === "Admin" || token?.role === "Rider" || token?.role === "Owner";
  const isAdminSpecificRoute = req.nextUrl.pathname.startsWith("/dashboard");
  if (isAdminSpecificRoute && !isAdminUser) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/signIn?callbackUrl=${callbackUrl}`, req.url)
    );
  }
  return NextResponse.next();
};
