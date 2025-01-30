"use client"

import { Card } from "primereact/card"
import { ResourceContext } from "../(page)/resources/[resourceId]/context"
import { ResourceWithImage } from "../(page)/resources/[resourceId]/types"
import ResourceControlPanel from "./resource_control_panel"
import ResourceImageTable from "./resource_image_table"
import ResourceImageUpload from "./resource_image_upload"

interface props {
    data: ResourceWithImage
}

export default function ResourceDashboard({ data }: props) {
    return (
        <Card title="Resource">
            <p>id: {data?.id}</p>
            <p>name: {data?.name}</p>
            <p>{data?.created_at.toDateString()}</p>
            <ResourceContext.Provider value={data}>
                <ResourceImageUpload />
                <ResourceControlPanel />
                <ResourceImageTable />
            </ResourceContext.Provider>
        </Card>
    )
}
