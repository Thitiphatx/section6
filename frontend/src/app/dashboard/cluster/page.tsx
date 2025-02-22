import prisma from "@/libs/prisma";
import ErrorPage from "@/components/error";
import ClusterLanding from "@/components/clusters/cluster_landing";

export default async function Cluster() {
    try {
        const clusters = await prisma.clusters.findMany();
        return (
            <div>
                <ClusterLanding data={clusters}/>
            </div>
        )
    } catch (error) {
        return (
            <ErrorPage message="Database is offline"/>
        )
    }

}
