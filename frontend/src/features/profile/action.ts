"use server"

import prisma from "@/libs/prisma"
import { compare, hashSync } from "bcryptjs"

export async function SaveInfoAction(prevState: any, formData: FormData) {
    const data = {
        id: formData.get("id") as string,
        email: formData.get("email") as string,
        name: formData.get("name") as string
    }
    if (!data.id) {
        return {
            ...prevState,
            errors: null,
            data,
            message: "Authorized failed please try again later",
            success: false
        }
    }
    const validationResult = InfoFormSchema.safeParse({
        email: data.email,
        name: data.name
    })

    if (!validationResult.success) {
        return {
            ...prevState,
            data,
            errors: validationResult.error.flatten().fieldErrors,
            message: null
        }
    }

    try {
        await prisma.users.update({
            where: { id: data.id },
            data: {
                email: data.email,
                name: data.name
            }
        })

        return {
            ...prevState,
            errors: null,
            data,
            message: 'Information updated successfully.',
            success: true
        }
    } catch (error) {
        return {
            ...prevState,
            errors: null,
            data,
            message: 'Failed to update user information.',
            success: false
        }
    }
}

export async function SavePasswordAction(prevState: any, formData: FormData) {
    const data = {
        id: formData.get("id") as string,
        currentPass: formData.get("currentPass") as string,
        newPass: formData.get("newPass") as string,
        confirmPass: formData.get("confirmPass") as string
    }
    if (!data.id) {
        return {
            ...prevState,
            errors: null,
            data,
            message: "Authorized failed please try again later",
            success: false
        }
    }
    const validationResult = PasswordFormSchema.safeParse({
        currentPass: data.currentPass,
        newPass: data.newPass,
        confirmPass: data.confirmPass
    })

    if (!validationResult.success) {
        return {
            ...prevState,
            data,
            errors: validationResult.error.flatten().fieldErrors,
            message: null
        }
    }
    
    try {
        const user = await prisma.users.findFirst({
            where: { id: data.id }
        })
        if (!user) {
            return {
                ...prevState,
                errors: null,
                data,
                message: 'Something went wrong. Re signin again',
                success: false
            }
        }

        const matched = await compare(data.currentPass, user.password);
        if (matched) {
            await prisma.users.update({
                where: { id: data.id },
                data: {
                    password: await hashSync(data.newPass, 10)
                }
            })
        }
        return {
            ...prevState,
            errors: null,
            data,
            message: 'Information updated successfully.',
            success: true
        }
    } catch (error) {
        return {
            ...prevState,
            errors: null,
            data,
            message: 'Failed to update user information.',
            success: false
        }
    }
}