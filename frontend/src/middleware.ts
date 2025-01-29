import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./app/lib/auth"; // Ensure this path is correct

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isProtectedRoute = pathname.startsWith('/backend');

    const session = await auth();

    // URLs for common redirects
    // const signInUrl = new URL('/signin', req.nextUrl);
    const homeUrl = new URL('/', req.nextUrl);

    //   if (!session?.user) {
    //     // Redirect to /signin if user is not authenticated
    //     return NextResponse.redirect(signInUrl);
    //   }


    if (session?.user.id && (pathname.startsWith('/signin') || pathname.startsWith('/signup'))) {
        return NextResponse.redirect(homeUrl);
    }

    if (isProtectedRoute && session?.user.role !== "admin") {
        // Redirect to / if user is not an admin
        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/backend/:path*', '/signin', '/signup'], // Matches all paths under /backend/*
};
