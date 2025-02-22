"use client"

import ResourceImageTable from "./resource_image_table"
import ResourceImageUpload from "./resource_image_upload"
import ResourceInfoPanel from "./resource_info_panel"
import { TabView, TabPanel } from "primereact/tabview"
import ResourceDeletePanel from "./resource_delete_panel"
import ResourceModelPanel from "./resource_model_panel"
import { ResourceContext } from "@/contexts/resources/context"
import { ResourceWithImage } from "@/types/resources"
import ResourceCluster from "./resource_cluster"

interface props {
    data: ResourceWithImage
}

export default function ResourceDashboard({ data }: props) {
    return (
        <ResourceContext.Provider value={data}>
            <TabView>
                <TabPanel header="settings">
                    <ResourceInfoPanel />
                    <ResourceDeletePanel />
                </TabPanel>
                <TabPanel header="image">
                    <ResourceImageUpload />
                    <ResourceImageTable />
                </TabPanel>
                <TabPanel header="segmentation">
                    <ResourceModelPanel />
                    <ResourceCluster />
                </TabPanel>
            </TabView>
        </ResourceContext.Provider>
    )
}
