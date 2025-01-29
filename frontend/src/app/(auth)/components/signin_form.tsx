"use client"

import { useActionState, useEffect } from "react";
import { SignInAction } from "../actions";
import { signIn } from "next-auth/react";

const initialState = {
    errors: null,
    data: {
        email: "",
        password: ""
    },
    message: null,
    success: false
}

export default function SignInForm() {
    const [state, action, pending] = useActionState(SignInAction, initialState)

    useEffect(()=> {
        const login = async()=> {
            console.log(state)
            await signIn("credentials",{
                email: state.data.email,
                password: state.data.password,
                redirect: true
            });
        }

        if (state.success) {
            login();
        }
    }, [state])

    return (
        <div className="mx-auto max-w-lg bg-base-100 p-5 rounded-lg mt-5">
            <h1 className="text-3xl font-bold text-center">SignIn</h1>
            <form action={action} className="w-full">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input name="email" type="email" placeholder="Type here" defaultValue={state.data.email} className="input input-bordered w-full" />
                    <div className="label">
                        {state?.errors?.email && <span className="label-text-alt text-error">{state.errors.email}</span>}
                    </div>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input name="password" type="password" placeholder="Type here" defaultValue={state.data.password} className="input input-bordered w-full" />
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
