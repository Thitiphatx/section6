"use client";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";
import { Images } from "@prisma/client";
import { ProgressBar } from "primereact/progressbar";
import React from "react";
import { useResourceContext } from "@/contexts/resources/context";
import { ResourceWithImage } from "@/types/resources";

export default function ResourceModelPanel() {
    const data: ResourceWithImage = useResourceContext();
    const [modelList, setModelList] = useState<string[]>([]);
    const [progress, setProgress] = useState(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        if (!checkAllImageStatus(data)) return;

        const fetchModels = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/segmentation/list");
                if (!response.ok) throw new Error("Failed to fetch models");

                const result = await response.json();
                setModelList(result.models);
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        };

        fetchModels();
    }, [data]); // Ensure `data` is in dependencies

    const checkAllImageStatus = (resource: ResourceWithImage): boolean => {
        return resource.Images.every((image: Images) => image.status === "AVAILABLE");
    };

    const handleSegmentation = async () => {
        if (!selectedModel) {
            toast.current?.show({ severity: "error", summary: "Error", detail: "Please select a model", life: 3000 });
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/segmentation/start",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        resourceId: data.id,
                        modelId: selectedModel
                    })
                }
            );
            const result = await response.json();

            const eventSource = new EventSource(`http://localhost:5000/api/segmentation/progress/${data.id}`);
            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setProgress(data);

                if (data.status === "done") {
                    eventSource.close();
                }
            }

        } catch (error) {
            console.log(error);
        }
    };

    const progressTemplate = (value: any) => {
        return (
            <React.Fragment>
                {value}/{progress.total}
            </React.Fragment>
        )
    }

    return (
        <Card title="Segmentation">
            <Toast ref={toast} />
            {!checkAllImageStatus(data) ? (
                <Message severity="warn" text="All images must be available. Please upload missing images." />
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleSegmentation(); }}>
                    {modelList.length > 0 ? (
                        <div className="p-inputgroup">
                            <Dropdown
                                name="model_id"
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.value)}
                                options={modelList}
                                placeholder="Select a Model"
                            />
                            <Button type="submit" label="Start" />
                        </div>
                    ) : (
                        <Message severity="error" text="Cannot connect to the server" />
                    )}
                </form>
            )}
            {progress && (
                <div> 
                    <p>Processing Image {progress.index} of {progress.total}</p>
                    {progress.status === "done" && <p>Segmentation Complete!</p>}
                </div>
            )}
        </Card>
    );
}
