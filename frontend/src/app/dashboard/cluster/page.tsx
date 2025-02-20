import prisma from "@/app/lib/prisma";
import ClusterLanding from "./components/cluster_landing";
import ErrorPage from "@/app/components/error";

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
