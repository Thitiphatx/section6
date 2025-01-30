"use client"

import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";

export default function ResourceControlPanel() {
    const [model_list, setModelList] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState();
    useEffect(() => {
        const fetchModel = async () => {
            try {
                const response = (await fetch("http://localhost:5000/api/backend/getModelList"));
                const result = await response.json();
                setModelList(result.models);
            } catch (error) {
                console.log(error);
            }
        }
        fetchModel();
    }, [])
    return (
        <>
            <div className="join">
                <Dropdown 
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.value)}
                    options={model_list.map((model)=> ({name: model, code: model}))}
                    optionLabel="name"
                    placeholder="Select a Model" className="w-full md:w-14rem" />
                <button className="btn btn-primary join-item">start</button>
            </div>
            <button className="btn btn-error">delete</button>
        </>
    )
}