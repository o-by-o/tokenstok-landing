import { NextResponse } from "next/server";

// Basic Auth guard for /investors. Credentials are read from env:
//   INVESTORS_USER     (default: "investors")
//   INVESTORS_PASSWORD (required — page returns 503 if unset)

export function middleware(request) {
  const expectedUser = process.env.INVESTORS_USER || "investors";
  const expectedPass = process.env.INVESTORS_PASSWORD;

  if (!expectedPass) {
    return new NextResponse("Investors page password not configured", {
      status: 503,
    });
  }

  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      const decoded = atob(auth.slice(6));
      const sep = decoded.indexOf(":");
      if (sep > 0) {
        const user = decoded.slice(0, sep);
        const pass = decoded.slice(sep + 1);
        if (user === expectedUser && pass === expectedPass) {
          return NextResponse.next();
        }
      }
    } catch {}
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate":
        'Basic realm="ТокенСток · инвестиционное предложение", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/investors", "/investors/:path*"],
};
