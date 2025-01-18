"use client"

import { useActionState } from "react";
import { signin } from "../actions";

export default function SignInForm() {
    const [state, action, pending] = useActionState(signin, undefined)

    return (
        <div className="mx-auto max-w-lg bg-base-100 p-5 rounded-lg mt-5">
            <h1 className="text-3xl font-bold text-center">SignIn</h1>
            <form action={action} className="w-full">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input name="email" type="email" placeholder="Type here" className="input input-bordered w-full" />
                    <div className="label">
                        {state?.errors?.email && <span className="label-text-alt text-error">{state.errors.email}</span>}
                    </div>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input name="password" type="password" placeholder="Type here" className="input input-bordered w-full" />
                    <div className="label">
                        {state?.errors?.password && <span className="label-text-alt text-error">{state.errors.password}</span>}
                    </div>
                </label>
                <button className="btn btn-primary btn-block" disabled={pending}>
                    {pending ? <span className="loading loading-spinner"></span> : 'SignIn'}
                </button>
            </form>
            <div className="divider">or</div>
            <a href="/signup" className="btn btn-block btn-ghost">signup</a>
        </div>
    )
}
