"use client"

import { Clusters } from "@prisma/client"
import { ClusterContext } from "../utils/context";
import ClusterGrid from "./cluster_grid";
import ClusterSearch from "./cluster_search";

export default function ClusterLanding({ data }: { data: Clusters[] }) {

    return (
        <ClusterContext.Provider value={data}>
            <ClusterSearch />
            <ClusterGrid />
        </ClusterContext.Provider>
    )
}
