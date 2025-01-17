"use server"

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