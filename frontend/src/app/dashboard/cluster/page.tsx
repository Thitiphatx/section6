import prisma from "@/app/lib/prisma";
import ClusterLanding from "./components/cluster_landing";

export default async function Cluster() {
    const clusters = await prisma.clusters.findMany();
    return (
        <div>
            <ClusterLanding data={clusters}/>
        </div>
    )
}
