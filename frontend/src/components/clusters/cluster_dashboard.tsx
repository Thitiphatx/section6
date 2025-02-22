"use client"

import { Card } from "primereact/card"
import { ClusterWithVersionImage } from "../../types/clusters"
import Player2 from "@/app/player/[clusterId]/components/player"
import { ClusterContext } from "@/contexts/clusters/clusterContext"
import ClusterForm from "./cluster_form"


export default function ClusterDashboard({ data }: { data: ClusterWithVersionImage }) {
    return (
        <div>
            <ClusterContext.Provider value={data}>
                <Card title="test">
                    <div className="grid grid-cols-2 gap-5">
                        <Player2 />
                        <ClusterForm />
                    </div>

                </Card>
            </ClusterContext.Provider>
        </div>
    )
}
