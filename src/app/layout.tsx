import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { SessionProvider } from "next-auth/react";

const comfortaa = Comfortaa({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Section6",
	description: "wow",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-theme="dark">
			<body className={`${comfortaa.className}  antialiased bg-base-300 min-h-screen`} >
				<SessionProvider>
					<header><Navbar /></header>
					<main>
						{children}
					</main>
				</SessionProvider>
			</body>
		</html>
	);
}
