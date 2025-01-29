"use client"

import { useActionState, useEffect } from "react"
import { SignUpAction } from "../actions"

export default function SignUpForm() {
    const [state, action, pending] = useActionState(SignUpAction, undefined)

    return (
        <div className="mx-auto max-w-lg bg-base-100 p-5 rounded-lg mt-5">
            <h1 className="text-3xl font-bold text-center">SignUp</h1>
            <form action={action} className="w-full">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Name</span>
                    </div>
                    <input name="name" type="text" placeholder="Type here" className="input input-bordered w-full" />
                    <div className="label">
                        {state?.errors?.name && <span className="label-text-alt text-error">{state.errors.name}</span>}
                    </div>
                </label>

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
                    {pending ? <span className="loading loading-spinner"></span> : 'Sign up'}
                </button>
            </form>
        </div>
    )
}
