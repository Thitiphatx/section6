import prisma from "@/libs/prisma";
import ErrorPage from "@/components/error";
import ClusterDashboard from "@/components/clusters/cluster_dashboard";

export default async function Cluster() {
    try {
        const clusters = await prisma.clusters.findMany();
        return (
            <div>
                <ClusterDashboard data={clusters}/>
            </div>
        )
    } catch (error) {
        return (
            <ErrorPage message="Database is offline"/>
        )
    }

}
