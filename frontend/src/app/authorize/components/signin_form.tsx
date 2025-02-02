"use client"

import { useActionState, useEffect } from "react";
import { SignInAction } from "../utils/actions";
import { signIn } from "next-auth/react";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { useRouter } from "next/navigation";

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
        <Card title="Signin" className="mx-auto max-w-xl mt-5">
            <form action={action} className="w-full flex flex-col gap-5">
                <div>
                    <FloatLabel className="flex flex-col gap-2">
                        <InputText className="w-full" name="email" defaultValue={state.data.email} type="email" tabIndex={1} invalid={state?.errors?.email} />
                        <label>Email</label>
                    </FloatLabel>
                    <small className="p-error">{state?.errors?.email}</small>
                </div>
                <div>
                    <FloatLabel className="flex flex-col gap-2">
                        <Password className="w-full" pt={{ input: { className: 'w-full' } }} name="password" defaultValue={state.data.password} feedback={false} tabIndex={2} invalid={state?.errors?.password} />
                        <label>Password</label>
                    </FloatLabel>
                    <small className="p-error">{state?.errors?.password}</small>
                </div>
                <Button label="Signin" loading={pending} />
            </form>
            <Divider />
            <Button className="w-full" label="Signup" severity="secondary" onClick={()=> router.push("/authorize/signup")} />
        </Card>
    )
}
