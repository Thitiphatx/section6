"use server"

import prisma from "@/app/lib/prisma";
import { create_image_data, ImageData } from "./create_image_data";

export interface ImportResource {
    name: string;
    created_at: Date;
    Images: ImageData[];
}

export const import_resource = async (resource: ImportResource)=> {
    // let timestamp = resource[resource.length - 1].time;
    // var date = new Date(parseFloat(timestamp) * 1000);
    // console.log(date)
    const new_resource = await prisma.resources.create({
        data: {
            name: resource.name,
            created_at: new Date(),
        }
    })
    await create_image_data(new_resource.id, resource.Images);
}