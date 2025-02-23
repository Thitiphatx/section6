"use server"

import prisma from "@/libs/prisma"

export const saveSegmentedImage = async (resourceId: string, imageName: string, unique_class: number[]) => {
    try {
        await prisma.images.update({
            where: {
                resource_id_file_name: {
                    resource_id: resourceId,
                    file_name: imageName
                }
            },
            data: {
                processed_path: `/segmentation/${resourceId}/${imageName}.npz`,
                detected_object: JSON.stringify(unique_class)
            }
        })
    } catch (error) {
        return {
            message: "Database is offline."
        }
    }
}

export const summarize_class = async ()=> {

}