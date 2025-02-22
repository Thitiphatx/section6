"use client"

import { Clusters } from "@prisma/client"
import ClusterGrid from "./cluster_grid";
import ClusterSearch from "./cluster_search";
import { ClustersContext } from "@/contexts/clusters/clustersContext";

export default function ClusterLanding({ data }: { data: Clusters[] }) {

    return (
        <ClustersContext.Provider value={data}>
            <ClusterSearch />
            <ClusterGrid />
        </ClustersContext.Provider>
    )
}
