export { auth as middleware } from "@/app/lib/auth";

export const config = {
    

    matcher: ["/((?!api|_next/static|_next/image!.*\\.png$).*)"],
}