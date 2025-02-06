"use client"

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";

export default function ResourceModelPanel() {
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
        <Card title="Segmentation">
            {model_list.length != 0 ? (
                <div className="p-inputgroup">
                    <Dropdown
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.value)}
                        options={model_list.map((model) => ({ name: model, code: model }))}
                        optionLabel="name"
                        placeholder="Select a Model" className="w-full md:w-14rem" />
                    <Button label="Start" />
                </div>
            ) : (
                <div>
                    No model available.
                </div>
            )}
        </Card>
    )
}