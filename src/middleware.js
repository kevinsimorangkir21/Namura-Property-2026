import { NextResponse } from "next/server";

export function middleware(request) {
    // Client-side auth check is handled by the AuthGuard component
    // This middleware only handles server-side redirects for non-authenticated access
    // Since JWT is stored in localStorage (client-side only), we use a lightweight approach
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
