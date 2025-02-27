"use client";
import { useResourceContext } from "@/contexts/resources/context";
import { resizeImage } from "@/features/resources/resize_image";
import { resource_status_validation } from "@/features/resources/resource_status_validation";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ProgressBar } from "primereact/progressbar";
import { useState } from "react";


const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB per chunk

export default function ResourceImageUpload() {
    const data = useResourceContext();
    const router = useRouter();
    const [files, setFiles] = useState<File[]>([]);
    const [progress, setProgress] = useState(0); // Overall progress
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
            setProgress(0); // Reset progress when new files are selected
        }
    };

    const uploadChunk = async (file: File, chunk: Blob, index: number, totalChunks: number, totalFiles: number, fileIndex: number) => {
        const formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("index", index.toString());
        formData.append("totalChunks", totalChunks.toString());
        formData.append("fileName", file.name);
        formData.append("resourceId", data.id); // Add resourceId

        try {
            await fetch("/api/zip", {
                method: "POST",
                body: formData,
            });
        } catch(error) {
            console.log(error);
        } finally {
            await resource_status_validation(data.id);
            window.location.reload();
        }


        // Calculate overall progress across all files
        const uploadedChunks = fileIndex * totalChunks + (index + 1);
        const totalChunksToUpload = totalFiles * totalChunks;
        setProgress(Math.round((uploadedChunks / totalChunksToUpload) * 100));
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert("Please select files!");
            return;
        }

        setIsUploading(true);
        setProgress(0);

        const totalFiles = files.length;

        for (let fileIndex = 0; fileIndex < totalFiles; fileIndex++) {
            const file = files[fileIndex];
            const resizedImage = await resizeImage(file) as File;
            const totalChunks = Math.ceil(resizedImage.size / CHUNK_SIZE);

            for (let i = 0; i < totalChunks; i++) {
                const start = i * CHUNK_SIZE;
                const end = Math.min(start + CHUNK_SIZE, resizedImage.size);
                const chunk = resizedImage.slice(start, end);

                await uploadChunk(resizedImage, chunk, i, totalChunks, totalFiles, fileIndex);
            }
        }

        alert("All files uploaded successfully!");
        setIsUploading(false);
        setProgress(100); // Ensure it reaches 100%
    };

    return (
        <Card title="Upload image">
            <div className="p-inputgroup max-w-screen-sm">
                <label htmlFor="file-upload" className="p-button">
                    Choose
                </label>
                <InputText variant="filled" disabled value={`${files.length} files selected`} />
                <input id="file-upload" className="sr-only" type="file" accept="image/*" multiple onChange={handleFileChange} />
                <Button onClick={handleUpload} disabled={isUploading} label={isUploading ? "Uploading..." : "Upload"} />
            </div>


            {isUploading && (
                <div className="mt-4">
                    <ProgressBar value={progress} showValue />
                    <p className="text-center mt-2">{progress}%</p>
                </div>
            )}
        </Card>

    );
}
