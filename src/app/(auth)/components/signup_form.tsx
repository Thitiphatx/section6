"use client"

import { useActionState } from "react"
import { signup } from "../signup/actions"

export default function SignUpForm() {
    const [state, action, pending] = useActionState(signup, undefined)

    return (
        <form action={action} className="flex flex-col">
            <input name="name" />
            {state?.errors?.name && <p>{state.errors.name}</p>}
            <input name="email" />
            {state?.errors?.email && <p>{state.errors.email}</p>}
            <input name="password"/>
            {state?.errors?.password && <p>{state.errors.password}</p>}

            <button disabled={pending}>
                {pending ? 'Submitting...' : 'Sign up'}
            </button>
        </form>
    )
}
