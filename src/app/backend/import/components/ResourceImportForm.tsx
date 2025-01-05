"use client"

import { resourceImport } from "../libs/resourceImport"

export default function ResourceImportForm() {

    const handleSubmit = async (event: React.FormEvent)=> {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement); // Get the form data
        const file = formData.get("resource") as File; // Get the uploaded file
        if (file) {
          const reader = new FileReader();
    
          reader.onload = (event: ProgressEvent<FileReader>) => {
            const text = event.target?.result as string;
            const rows = text.trim().split("\n");
            const data = rows.slice(1).map((line) => {
              const [id, image, time, X, Y, Z] = line.split(",");
              return { image, time, X, Y, Z };
            });
            resourceImport(data);
          };
    
          reader.readAsText(file); // Read the file as text
        } else {
          console.error("No file selected");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label>import resource</label>
            <input name="resource" type="file" accept=".txt" />
            <button className="bg-zinc-800 p-2">import</button>
        </form>
    )
}
