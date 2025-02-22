"use client"

import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import { FileUpload, FileUploadBeforeUploadEvent, FileUploadHandlerEvent, FileUploadHeaderTemplateOptions, ItemTemplateOptions } from "primereact/fileupload";
import { useRef, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useResourceContext } from "@/contexts/resources/context";
import { ResourceWithImage } from "@/types/resources";

export default function ResourceImageUpload() {
	const data: ResourceWithImage = useResourceContext();
	const toast = useRef<Toast>(null);

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
	const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
		const file = inFile as File;
		return (
			<div className="flex items-center">
				<span className="flex flex-col text-left ml-3">
					{file.name}
				</span>
				<Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(props.onRemove)} />
			</div>
		);
	};
	const onTemplateRemove = (callback: Function) => {
		callback();
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
	const chooseOptions = {
		className: 'p-button-outlined p-button-info'
	};
	const uploadOptions = {
		className: 'p-button-success p-button-rounded p-button-outlined'
	};
	const cancelOptions = {
		className: 'p-button-danger p-button-rounded p-button-outlined'
	};
	const onBeforeUploader = (event: FileUploadBeforeUploadEvent) => {
		const formData = event.formData
		formData.append("resourceId", data.id);
	};
	return (
		<Card title="Upload image" className="">
			<Toast ref={toast}></Toast>
			<Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
			<Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
			<Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

			<FileUpload
				name="files"
				multiple
				accept="image/*"
				maxFileSize={10000000000}
				url="/api/upload"
				headerTemplate={headerTemplate}
				onBeforeUpload={onBeforeUploader}
				emptyTemplate={emptyTemplate}
				itemTemplate={itemTemplate}
				chooseOptions={chooseOptions}
				uploadOptions={uploadOptions}
				cancelOptions={cancelOptions}
			/>
		</Card>
	)
}
