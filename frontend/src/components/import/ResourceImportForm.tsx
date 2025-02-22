"use client";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { useState } from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Convert_XYZ } from "@/features/import/convert_XYZ";
import { import_resource } from "@/features/import/import_resource";

export default function ResourceImportForm() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [resourceName, setResourceName] = useState("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileSelect = (event: FileUploadSelectEvent) => {
        const file = event.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!selectedFile || !resourceName) {
            console.log("File or resource name missing");
            return;
        }

        setLoading(true); // Start loading

        const reader = new FileReader();
        reader.onload = async (event: ProgressEvent<FileReader>) => {
            try {
                const text = event.target?.result as string;
                const rows = text.trim().split("\n");
                const data = rows.slice(1).map((line) => {
                    const [id, image_name, time, X, Y] = line.split(",");
                    const [lon, lat] = Convert_XYZ(parseFloat(X), parseFloat(Y));
                    return {
                        latitude: lat,
                        longitude: lon,
                        timestamp: new Date(parseFloat(time) * 1000),
                        file_name: image_name,
                    };
                });

                await import_resource({
                    name: resourceName,
                    created_at: new Date(),
                    Images: data,
                });

                console.log("Resource imported successfully");
                setSelectedFile(null);
                setResourceName("");
            } catch (error) {
                console.log(error instanceof Error ? error.message : "An unknown error occurred.");
            } finally {
                setLoading(false); // Stop loading after processing
            }
        };

        reader.readAsText(selectedFile);
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="font-bold block mb-2">Resource Name</label>
                    <InputText
                        name="resource_name"
                        value={resourceName}
                        onChange={(e) => setResourceName(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <Divider />
                <div>
                    <label className="font-bold block mb-2">Resource File (.txt)</label>
                    <FileUpload
                        name="resource"
                        mode="basic"
                        accept=".txt"
                        maxFileSize={1000000}
                        customUpload
                        auto={false}
                        chooseLabel="Choose Resource"
                        onSelect={handleFileSelect}
                        disabled={loading}
                    />
                </div>
                <Divider />
                <Button
                    label="Import"
                    icon="pi pi-check"
                    iconPos="right"
                    type="submit"
                    loading={loading}
                    disabled={loading || !selectedFile || !resourceName}
                />
            </form>
        </Card>
    );
}
