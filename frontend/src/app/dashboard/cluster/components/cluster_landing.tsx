"use client"

import { Clusters } from "@prisma/client"
import { ClustersContext } from "../utils/context";
import ClusterGrid from "./cluster_grid";
import ClusterSearch from "./cluster_search";

export default function ClusterLanding({ data }: { data: Clusters[] }) {

    return (
        <ClustersContext.Provider value={data}>
            <ClusterSearch />
            <ClusterGrid />
        </ClustersContext.Provider>
    )
}
