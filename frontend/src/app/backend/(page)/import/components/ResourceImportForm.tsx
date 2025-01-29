"use client"

import { import_resource } from "../libs/import_resource";
import { Convert_XYZ } from "../libs/convert_XYZ";

export default function ResourceImportForm() {

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement); // Get the form data
		const file = formData.get("resource") as File; // Get the uploaded file
		const resource_name = formData.get("resource_name") as string;

		if (file) {
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
					name: resource_name,
					created_at: new Date(),
					Images: data
				});
			};

			reader.readAsText(file); // Read the file as text
		} else {
			console.error("No file selected");
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col max-w-lg bg-base-100 p-5 rounded-lg">
			<label>import resource</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text">Resource Name</span>
				</div>
				<input name="resource_name" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
				<div className="label">
					<span className="label-text-alt">Bottom Left label</span>
				</div>
			</label>

			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text">Resource Name</span>
				</div>
				<input name="resource" type="file" accept=".txt" className="file-input file-input-bordered w-full max-w-xs" />
				<div className="label">
					<span className="label-text-alt">Bottom Left label</span>
				</div>
			</label>
			<button className="btn btn-block">import</button>
		</form>
	)
}
