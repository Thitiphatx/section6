"use server"

import prisma from "@/libs/prisma"

export async function DeleteResource(id: string) {
    try {
        await prisma.resources.update({
            where: { id: id },
            data: {

            }
        })
    } catch (error) {
        console.log(error);
    }
}