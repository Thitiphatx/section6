"use client"

import { useResourceContext } from "@/contexts/resources/context";
import { extract_coordinates, getExtractProgress } from "@/features/resources/extract_coordinates";
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";

export default function ResourceCluster() {
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(false)

    const startExtraction = async () => {
        setLoading(true)
        setProgress(0) // Reset progress
        await extract_coordinates(data)
        setLoading(false)
    }
    
    useEffect(()=> {
        if (!loading) return;

        const interval = setInterval(async () => {
            const newProgress = await getExtractProgress();
            setProgress(newProgress);
      
            if (newProgress >= 100) {
              clearInterval(interval);
            }
          }, 500);
      
          return () => clearInterval(interval);

    }, [loading])

    const data = useResourceContext();
    return (
        <Card title="Cluster extraction">
            <Message severity="warn" text="When starting the process, the data will be grouped by road. The result will appear in the cluster. Note that it may take longer depending on the amount of data" />
            <Divider />
            <Button label="start extraction" icon="pi pi-play" onClick={startExtraction} loading={loading}/>
            <Divider />
            <ProgressBar value={progress}></ProgressBar>
        </Card>
    )
}
