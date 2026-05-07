// middleware.ts — à la RACINE du projet (pas dans app/)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/*
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Logger chaque requête API dans la console serveur
  if (pathname.startsWith("/api")) {
    console.log(`[API] ${request.method} ${pathname}`);
  }
  return NextResponse.next(); // laisser passer la requête
}

// Configurer sur quelles routes le middleware s'applique
export const config = {
  matcher: ["/api/:path*", "/profile/:path*"],
};
*/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  if (pathname.startsWith("/api")) {
    const timestamp = new Date().toISOString().split("T")[1].slice(0, 8);
    console.log(`[${timestamp}] ${method.padEnd(6)} ${pathname}`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
