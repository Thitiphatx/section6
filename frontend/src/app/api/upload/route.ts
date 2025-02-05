import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises"
import path from "path";
import fs from "fs";
import prisma from "@/app/lib/prisma";

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const formData = await req.formData();
        const files = formData.getAll("files") as File[];
        const resourceId = formData.get("resourceId") as string;
        // check is id valid
        try {
            const resource = await prisma.resources.findFirst({
                where: { id: resourceId }
            })
            if (!resource) return NextResponse.json({ Message: "Failed", status: 500 });
        } catch (error) {
            return NextResponse.json({ Message: "Cannot connect the database", status: 500 });
        }

        if (!files || files.length === 0) {
            return NextResponse.json({ message: "No files uploaded", status: 400 });
        }

        const resourceDir = path.join(process.cwd(), "../resources");
        if (!fs.existsSync(resourceDir)) {
            await mkdir(resourceDir);
        }

        const uploadDir = path.join(resourceDir, resourceId);
        if (!fs.existsSync(uploadDir)) {
            await mkdir(uploadDir);
        }

        const uploadedFiles: string[] = [];

        for (const file of files) {
            const validImage = await prisma.images.findFirst({
                where: {
                    file_name: file.name,
                    resource_id: resourceId
                }
            })
            if (!validImage) continue;
            const buffer = Buffer.from(await file.arrayBuffer());
            const filePath = path.join(uploadDir, file.name);
            
            await writeFile(filePath, buffer);
            uploadedFiles.push(filePath);

            await prisma.images.update({
                where: {
                    resource_id_file_name: {
                        file_name: file.name,
                        resource_id: resourceId
                    }
                },
                data: {
                    status: "AVAILABLE",
                    file_path: `/resources/${resourceId}/${file.name}`
                }
            })
        }

        return NextResponse.json({
            Message: "Files uploaded successfully",
            files: uploadedFiles,
            status: 200,
        });
    } catch (err) {
        console.error("Error during file upload:", err);
        return NextResponse.json({ Message: "Failed", status: 500 });
    }
};