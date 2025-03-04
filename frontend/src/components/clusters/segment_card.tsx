"use client"

import { saveSegmentedImage } from "@/features/resources/save_segment_result";
import { Button } from "primereact/button";
import { Card } from "primereact/card"
import { Dropdown } from "primereact/dropdown";
import { Message } from "primereact/message";
import { ProgressBar } from "primereact/progressbar";
import { Toast } from "primereact/toast";
import React from "react";
import { useEffect, useRef, useState } from "react";

export default function SegmentCard() {
    const [modelList, setModelList] = useState<string[]>([]);
    const [progress, setProgress] = useState(null);
    const [currentImage, setCurrentImage] = useState('');
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/segmentation/list");
                if (!response.ok) return null;

                const result = await response.json();
                setModelList(result.models);
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        };

        fetchModels();
    }, []); // Ensure `data` is in dependencies

    const handleSegmentation = async () => {
        if (!selectedModel) {
            toast.current?.show({ severity: "error", summary: "Error", detail: "Please select a model", life: 3000 });
            return;
        }

        try {
            const eventSource = new EventSource(`http://localhost:5000/api/segmentation/start?modelId=${selectedModel}&resourceId=${data.id}`);

            eventSource.onmessage = async (event) => {
                const result = JSON.parse(event.data);
                setProgress(result.progress);
                setCurrentImage(result.current_image);

                // Update segmented result to database
                await saveSegmentedImage("resourceId", result.current_image, result.unique_class);

                // Check for the completion of the process
                if (result.progress === 100) {
                    eventSource.close();
                }
            };

            eventSource.onerror = function () {
                console.log("error with SSE connection");
            };

        } catch (error) {
            console.log(error);
        }
    };


    const progressTemplate = (value: any) => {
        return (
            <React.Fragment>
                {progress}/{100}%
            </React.Fragment>
        )
    }
    return (
        <Card className="shadow-lg border-0 overflow-hidden">
            <div className="rounded-md overflow-hidden">
                <Toast ref={toast} />
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
                {progress && (
                    <div>
                        <ProgressBar value={progress} displayValueTemplate={progressTemplate} />
                        {progress !== 100 && <small>{currentImage}</small>}
                    </div>
                )}
            </div>
        </Card>
    )
}
