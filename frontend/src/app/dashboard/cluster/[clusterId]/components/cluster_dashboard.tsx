"use client"

import { Card } from "primereact/card"
import { ClusterContext } from "../utils/context"
import { ClusterWithVersionImage } from "../utils/type"
import ClusterForm from "./cluster_form"


export default function ClusterDashboard({ data }: { data: ClusterWithVersionImage }) {
    return (
        <div>
            <ClusterContext.Provider value={data}>
                <Card title="test" className="grid grid-cols-2">
                    <ClusterForm />
                </Card>
            </ClusterContext.Provider>
        </div>
    )
}
