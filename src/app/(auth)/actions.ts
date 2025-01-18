"use server"

import { signIn } from "next-auth/react"
import { FormState, SignupFormSchema } from "./schema"

export async function signup(state: FormState, formData: FormData) {

    const validationResult = SignupFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    })

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }
}

export async function signin(state: FormState, formData: FormData) {
    const validationResult = SignupFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    })

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }
    console.log("asd")
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("asdasd")
    await signIn("credentials", {
        email,
        password,
        redirect: true
    })
}