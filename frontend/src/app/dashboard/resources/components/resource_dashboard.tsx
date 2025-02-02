"use client"

import { Card } from "primereact/card"
import ResourceControlPanel from "./resource_control_panel"
import ResourceImageTable from "./resource_image_table"
import ResourceImageUpload from "./resource_image_upload"
import { ResourceContext } from "../[resourceId]/context"
import { ResourceWithImage } from "../[resourceId]/types"
import ResourceInfoPanel from "./resource_info_panel"

interface props {
    data: ResourceWithImage
}

export default function ResourceDashboard({ data }: props) {
    return (
        <ResourceContext.Provider value={data}>
            <div className="space-y-5">
                <ResourceImageUpload />
                <ResourceInfoPanel />
                <ResourceControlPanel />
                <ResourceImageTable />
            </div>
        </ResourceContext.Provider>
    )
}
