"use client"

import { import_resource } from "../libs/import_resource";
import { Convert_XYZ } from "../libs/convert_XYZ";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { FileUpload, FileUploadHandlerEvent, FileUploadSelectEvent } from "primereact/fileupload";
import { useState } from "react";
import { Button } from "primereact/button";

export default function ResourceImportForm() {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [resourceName, setResourceName] = useState("");

	const handleFileSelect = (event: FileUploadSelectEvent) => {
		const file = event.files[0];
		setSelectedFile(file);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!selectedFile || !resourceName) {
			console.log("file missing");
			return;
		}
		// const formData = new FormData(event.target as HTMLFormElement); // Get the form data
		// const file = formData.get("resource") as File; // Get the uploaded file
		// const resource_name = formData.get("resource_name") as string;
		const reader = new FileReader();
		reader.onload = (event: ProgressEvent<FileReader>) => {
			const text = event.target?.result as string;
			const rows = text.trim().split("\n");
			const data = rows.slice(1).map((line) => {
				const [id, image_name, time, X, Y] = line.split(",");
				const [lat, lon] = Convert_XYZ(parseFloat(X), parseFloat(Y));
				return {
					latitude: lat,
					longitude: lon,
					timestamp: new Date(parseFloat(time) * 1000),
					file_name: image_name
				};
			});
			import_resource({
				name: resourceName,
				created_at: new Date(),
				Images: data
			});
		};
		reader.readAsText(selectedFile); // Read the file as text
	}

	return (
		<Card title="Import new resource">
			<form onSubmit={handleSubmit} className="flex flex-col gap-5">
				<div>
					<FloatLabel className="flex flex-col">
						<InputText name="resource_name" onChange={(e) => setResourceName(e.target.value)} />
						<label>Resource Name</label>
					</FloatLabel>
					<small className="p-error"></small>
				</div>
				<div>
					<FileUpload 
						name="resource"
						mode="basic"
						accept=".txt"
						maxFileSize={1000000} 
						customUpload
						auto={false}
						chooseLabel="Choose Resource"
						onSelect={handleFileSelect}
					/>
				</div>
				
				<Button label="Import" />
			</form>
		</Card>
	)
}
