"use client"

import { useActionState, useEffect } from "react"
import { SignUpAction } from "../utils/actions"
import { Card } from "primereact/card"
import { FloatLabel } from "primereact/floatlabel"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { Password } from "primereact/password"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

const initialState = {
    errors: null,
    data: {
        name: "",
        email: "",
        password: ""
    },
    message: null,
    success: false
}

export default function SignUpForm() {
    const [state, action, pending] = useActionState(SignUpAction, initialState)
    const router = useRouter();
    useEffect(() => {
        const login = async () => {
            await signIn("credentials", {
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
        <Card title="Signup" className="mx-auto max-w-xl mt-5">
            <form action={action} className="w-full flex flex-col gap-5">
                <div>
                    <FloatLabel className="flex flex-col gap-2">
                        <InputText name="name" invalid={state?.errors?.name} defaultValue={state.data.name} />
                        <label>Name</label>
                    </FloatLabel>
                    <small className="p-error">{state?.errors?.name}</small>
                </div>
                <div>
                    <FloatLabel className="flex flex-col gap-2">
                        <InputText name="email" invalid={state?.errors?.email} defaultValue={state.data.email}/>
                        <label>Email</label>
                    </FloatLabel>
                    <small className="p-error">{state?.errors?.email}</small>
                </div>
                <div>
                    <FloatLabel className="flex flex-col gap-2">
                        <Password className="w-full" pt={{ input: { className: 'w-full' } }} name="password" feedback={false} invalid={state?.errors?.password} />
                        <label>Password</label>
                    </FloatLabel>
                    <small className="p-error">{state?.errors?.password}</small>
                </div>
                <Button label="Sign up" />
            </form>
            <Divider />
            <Button label="Sign in" severity="secondary" className="w-full" onClick={() => router.push("/authorize/signin")} />
        </Card>
    )
}
