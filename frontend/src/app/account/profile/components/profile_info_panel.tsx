"use client"

import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { useProfileContext } from "../utils/profileContext"
import { Button } from "primereact/button";
import { useActionState, useState } from "react";
import { SaveInfoAction } from "../utils/action";
import { Message } from "primereact/message";

const initialState = {
    errors: null,
    data: {
        email: "",
        name: ""
    },
    message: null,
    success: false
}

export default function ProfileInfoPanel() {
    const data = useProfileContext();
    const [initialState] = useState({
        errors: null,
        data: {
            email: data.email,
            name: data.name
        },
        message: null,
        success: false
    });
    const [state, action, pending] = useActionState(SaveInfoAction, initialState)

    return (
        <Card title="Profile">
            <form action={action} className="space-y-2">
                <input name="id" defaultValue={data.id} className="hidden" />
                <div className="flex flex-col gap-2">
                    <label htmlFor="username">Email</label>
                    <InputText name="email" type="email" defaultValue={state.data.email} invalid={state?.errors?.email} />
                    <small className="p-error">{state?.errors?.email}</small>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="username">Name</label>
                    <InputText name="name" defaultValue={state.data.name} invalid={state?.errors?.name} />
                    <small className="p-error">{state?.errors?.name}</small>
                </div>
                {state.message &&
                    <div>
                        <Message severity={`${state.success ? "success" : "error"}`} text={state.message} />
                    </div>
                }
                <Button label="Save" icon="pi pi-check" iconPos="right" size="small" loading={pending} />
            </form>

            <small>created since {data.created_at.toDateString()}</small>
        </Card>
    )
}
