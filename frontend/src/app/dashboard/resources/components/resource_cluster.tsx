"use client"

import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { extract_coordinates } from "../utils/extract_coordinates"
import { useResourceContext } from "../[resourceId]/context"

export default function ResourceCluster() {
    const data = useResourceContext();
    return (
        <Card>
            <Button label="cluster" onClick={()=> extract_coordinates(data)} />
        </Card>
    )
}
