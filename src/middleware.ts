import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

export default async function middleware(req: NextRequest) {
    const currentPath = req.nextUrl.pathname;

    // Match any route starting with /backend/
    const isProtectedRoute = currentPath.startsWith('/backend');

    const session = await auth();

    // Redirect to /signin if the user is not authenticated
    if (!session?.user) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    }

    // Redirect to / if the user is not an admin
    console.log(session.user.role)
    if (isProtectedRoute && session.user.role !== "admin") {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/backend/:path*'] // Matches all paths under /backend/*
};
