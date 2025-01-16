"use client"

import { useSession } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();
    return (
        <div>
            <ul className="flex flex-row justify-around bg-zinc-900">
                <li><a href="/">home</a></li>
                <li><a href="/backend">backend</a></li>
                <li>{!session?.user.id ? (<a href="/signin">signin</a>) : (<a href="/signin">{session?.user.name}</a>)
                    
                }</li>
            </ul>
        </div>
    )
}
