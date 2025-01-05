"use server"

import { PrismaClient } from "@prisma/client";
import { Resource } from "./type"

export const resourceImport = async (resource: Resource[])=> {
    const prisma = new PrismaClient();
    let timestamp = resource[resource.length - 1].time;
    var date = new Date(parseFloat(timestamp) * 1000);
    console.log(date)
    // const result = await prisma.resource.create({
    //     data: {
    //         time: date
    //     }
    // })
    const test = await prisma.resource.findFirst();
    console.log(test)
    // console.log(result)
}