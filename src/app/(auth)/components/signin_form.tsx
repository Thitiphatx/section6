"use client"

import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInForm() {
    const { data: session } = useSession();

    const submitSignIn = async (formData: FormData)=> {
        const email = formData.get("email");
        const password = formData.get("password");
        await signIn("credentials", {
            email,
            password,
            redirect: false
        })
    }
    return (
        <div>
            signin_form {session?.user.email}
            <form action={submitSignIn}>
                <input name="email" type="email" placeholder="email" />
                <input name="password" type="password" placeholder="password" />
                <button>signin</button>
            </form>
            <button onClick={()=> signOut()}>signout</button>
            <a href="/signup">signup</a>
        </div>
    )
}
