import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./app/lib/auth"; // Ensure this path is correct

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isProtectedRoute = pathname.startsWith(`/dashboard`);
    const authorizeRoute = pathname.startsWith('/authorize');

    const session = await auth();

    // URLs for common redirects
    // const signInUrl = new URL('/signin', req.nextUrl);
    const homeUrl = new URL('/', req.nextUrl);

    //   if (!session?.user) {
    //     // Redirect to /signin if user is not authenticated
    //     return NextResponse.redirect(signInUrl);
    //   }


    if (authorizeRoute && session?.user.id) {
        return NextResponse.redirect(homeUrl);
    }

    if (isProtectedRoute && session?.user.role !== "admin") {
        // Redirect to / if user is not an admin
        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/authorize/:path*'], // Matches all paths under /backend/*
};
