"use server"

import { signIn } from "next-auth/react"
import { SigninFormSchema, SignupFormSchema } from "./schema"
import { prisma } from "../lib/prisma"
import { hashSync } from "bcryptjs"

export async function SignUpAction(prevState: any, formData: FormData) {
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    }
    const validationResult = SignupFormSchema.safeParse({
        name: data.name,
        email: data.email,
        password: data.password
    })

    if (!validationResult.success) {
        return {
            ...prevState,
            data,
            errors: validationResult.error.flatten().fieldErrors
        }
    }
    const email = formData.get("email") as string;

    const existingUser = await prisma.users.findFirst({
        where: {
            email: email
        }
    })
    if (existingUser) {
        return {
            ...prevState,
            data,
            errors: {
                email: ["This email is already in use."],
            },
        };
    };

    const name = formData.get("name") as string;
    const rawPassword = formData.get("password") as string;

    const password = await hashSync(rawPassword, 10);
    await prisma.users.create({
        data: {
            name,
            email,
            password,
            created_at: new Date()
        }
    })

    return {
        ...prevState,
        data,
        errors: null,
        message: null
    }
}

export async function SignInAction(prevState: any, formData: FormData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password")
    }
    const validationResult = SigninFormSchema.safeParse({
        email: data.email,
        password: data.password
    })

    if (!validationResult.success) {
        return {
            ...prevState,
            data,
            errors: validationResult.error.flatten().fieldErrors
        }
    }
    return {
        ...prevState,
        errors: null,
        data,
        message: null,
        success: true
    }
}