"use client"

import { Images } from "@prisma/client"
import { uploadImage } from "../utils/upload_image";

export default function ResourceImageUpload({ CurrentList, id }: { CurrentList: Images[], id: number }) {

	const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;

		const files = Array.from(event.target.files);
		const formData = new FormData();

		// Filter images matching the filenames listed in `data?.Images`
		const validFiles = files.filter(file =>
			CurrentList.some(image => image.file_name === file.name)
		);

		if (validFiles.length === 0) {
			alert("No valid files to upload.");
			return;
		}

		validFiles.forEach(file => formData.append("images", file));
		await uploadImage(id, formData);
	};
	return (
		<div>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text">Pick a file</span>
				</div>
				<input type="file" onChange={handleFileUpload} multiple className="file-input file-input-bordered w-full max-w-xs" />
			</label>
		</div>
	)
}
