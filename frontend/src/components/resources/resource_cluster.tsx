"use client"

import { useResourceContext } from "@/contexts/resources/context";
import { extract_coordinates } from "@/features/resources/extract_coordinates";
import { Button } from "primereact/button"
import { Card } from "primereact/card"

export default function ResourceCluster() {
    const data = useResourceContext();
    return (
        <Card>
            <Button label="cluster" onClick={()=> extract_coordinates(data)} />
        </Card>
    )
}
