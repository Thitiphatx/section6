"use server"

import { writeFile } from "fs/promises";
import path from "path";

export const importImage = async (prevState: unknown, formData: FormData) => {
    // form validation


    const files = formData.getAll("images")
    try {
        for (const file of files) {
            if (file instanceof File) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const filename = file.name.replaceAll(" ", "_");
                const savePath = path.join(process.cwd(), "resources/" + filename);
                
                // write the file to the directory 
                await writeFile(savePath, buffer);
                console.log(`${savePath} saved`)
            }
        }

        return { message: "success" }
    } catch (error) {
        return { message: "failed" }
    }
}