import { NextResponse } from "next/server";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import path from "path";
import prisma from "@/libs/prisma";

const UPLOAD_DIR = path.join(process.cwd(), "../resources");

// Ensure upload directory exists
if (!existsSync(UPLOAD_DIR)) {
	mkdirSync(UPLOAD_DIR);
}

export async function POST(req: Request) {
	try {
		const formData = await req.formData();
		const chunk = formData.get("chunk") as File;
		const index = Number(formData.get("index"));
		const totalChunks = Number(formData.get("totalChunks"));
		const fileName = formData.get("fileName") as string;
		const resourceId = formData.get("resourceId") as string;

		if (!chunk) {
			return NextResponse.json({ error: "No chunk provided" }, { status: 400 });
		}

		const RESOURCE_DIR = path.join(UPLOAD_DIR, resourceId)
		if (!existsSync(RESOURCE_DIR)) {
			mkdirSync(RESOURCE_DIR);
		}

		const filePath = path.join(RESOURCE_DIR, fileName);

		// Append chunk to the correct file
		const writeStream = createWriteStream(filePath, { flags: "a" });
		const stream = chunk.stream();
		const reader = stream.getReader();

		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break; // Stop when stream ends

				writeStream.write(value); // Write chunk to file
			}
		} catch (error) {
			console.error("Error writing to file:", error);
		} finally {
			reader.releaseLock();
			writeStream.end(); // Close the file stream properly
		}
		await prisma.images.update({
			where: {
				resource_id_file_name: {
					file_name: fileName,
					resource_id: resourceId,
				},
			},
			data: {
				status: "AVAILABLE", // Mark as available once uploaded
			},
		});

		if (index + 1 === totalChunks) {
			return NextResponse.json({ message: `Upload complete for ${fileName}`, filePath });
		}

		return NextResponse.json({ message: `Chunk ${index + 1} received for ${fileName}` });
	} catch (error) {
		console.error("Upload error:", error);
		return NextResponse.json({ error: "Upload failed" }, { status: 500 });
	}
}
