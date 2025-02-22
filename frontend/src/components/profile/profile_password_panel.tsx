"use client"

import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { Password } from "primereact/password"
import { Message } from "primereact/message"
import { useProfileContext } from "@/contexts/profileContext"

export default function ProfilePasswordPanel() {
    const data = useProfileContext();

    return (
        <Card title="Password">
            <Message severity="warn" text="You need to re-login after change the password" />
            <form className="space-y-2">
                <input name="id" defaultValue={data.id} className="hidden"/>
                <div className="flex flex-col gap-2">
                    <label htmlFor="currentPass">Current password</label>
                    <Password feedback={false} name="currentPass" pt={{ input: { className: 'w-full' } }} />
                    <small className="p-error"></small>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="newPass">New password</label>
                    <Password feedback={false} name="newPass" pt={{ input: { className: 'w-full' } }} invalid={state?.errors?.confirmPass} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPass">Password confirmation</label>
                    <Password feedback={false} name="confirmPass" pt={{ input: { className: 'w-full' } }} invalid={state?.errors?.confirmPass} />
                    <small className="p-error">{state?.errors?.confirmPass}</small>
                </div>
                {state.message &&
                    <div>
                        <Message severity={`${state.success ? "success" : "error"}`} text={state.message} />
                    </div>
                }
                <Button label="Submit" icon="pi pi-check" iconPos="right" />
            </form>
        </Card>

    )
}
