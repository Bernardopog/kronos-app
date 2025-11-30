import { ProxyConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: "/signin", authenticated: "redirect" },
  { path: "/signup", authenticated: "redirect" },
  { path: "/signout", authenticated: "notRedirect" },
] as const;

const redirectWhenNotAuthenticated = "/signin";

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);

  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken && publicRoute) {
    return NextResponse.next();
  }
  if (!accessToken && !publicRoute) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = redirectWhenNotAuthenticated;

    return NextResponse.redirect(redirectUrl);
  }
  if (accessToken && publicRoute && publicRoute.authenticated === "redirect") {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";

    return NextResponse.redirect(redirectUrl);
  }
  if (accessToken && !publicRoute) {
    const [, payloadBase] = accessToken.split(".");
    const payload = JSON.parse(atob(payloadBase));

    if (payload.exp < Date.now() / 1000) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/signout";
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config: ProxyConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sw.js).*)"],
};
