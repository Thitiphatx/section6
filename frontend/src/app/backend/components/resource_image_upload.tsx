"use client"

import { uploadImage } from "../utils/upload_image";
import { useResourceContext } from "../(page)/resources/[resourceId]/context";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import { FileUpload, FileUploadHandlerEvent, FileUploadHeaderTemplateOptions } from "primereact/fileupload";
import { ChangeEvent, useRef, useState } from "react";

export default function ResourceImageUpload() {
	const data = useResourceContext();
	const toast = useRef<Toast>(null);
	const fileUploadRef = useRef<FileUpload>(null);

	const handleSubmit = async (event: React.FormEvent) => {

	}

	const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
		const { className, chooseButton, uploadButton, cancelButton } = options;

		return (
			<div className={`${className} justify-between`}>
				{chooseButton}
				<div>
					{uploadButton}{cancelButton}
				</div>
			</div>
		);
	};

	const emptyTemplate = () => {
		return (
			<div
				onDragOver={(e) => e.preventDefault()}
				className="w-full flex items-center flex-col">
				<i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
				<span className="my-5">
					Drag and Drop Image Here
				</span>
			</div>
		);
	};
	
	const handleFileUpload = async (event: FileUploadHandlerEvent) => {
		if (!event.files) return;

		const files = Array.from(event.files);
		console.log(files)
		const formData = new FormData();

		// Filter images matching the filenames listed in `data?.Images`
		const validFiles = files.filter(file =>
			data.Images.some((image: any) => image.file_name === file.name)
		);

		if (validFiles.length === 0) {
			alert("No valid files to upload.");
			return;
		}

		validFiles.forEach(file => formData.append("images[]", file));
		await uploadImage(data.id, formData);
	};
	const chooseOptions = {
		className: 'p-button-outlined p-button-info'
	};
	const uploadOptions = {
		className: 'p-button-success p-button-rounded p-button-outlined'
	};
	const cancelOptions = {
		className: 'p-button-danger p-button-rounded p-button-outlined'
	};

	return (
		<div>
			<div>
				<Toast ref={toast}></Toast>
				<Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
				<Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
				<Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

				<FileUpload
					ref={fileUploadRef}
					name="demo[]"
					multiple
					accept="image/*"
					maxFileSize={10000000000}
					url="/api/upload"
					headerTemplate={headerTemplate}
					emptyTemplate={emptyTemplate}
					chooseOptions={chooseOptions}
					uploadOptions={uploadOptions}
					cancelOptions={cancelOptions}
				/>
			</div>
		</div>
	)
}
