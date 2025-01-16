import { prisma } from "@/app/lib/prisma";
import NextAuth, { DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            role: string
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        role: string;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string };

                if (!email || !password) return null;

                const user = await prisma.users.findFirst({ where: { email } });
                if (!user) return null;

                // const matched = await compare(password, user.password as string);
                const matched = (password == user.password as string);
                if (!matched) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id ?? ""
            session.user.role = token.role ?? "user"
            return session
        }
    },
    pages: {
        signIn: "/signin"
    },
    secret: process.env.AUTH_SECRET
})