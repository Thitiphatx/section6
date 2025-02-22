import prisma from "@/libs/prisma";
import ClusterDashboard from "../../../../components/clusters/cluster_dashboard";

export default async function ClusterPage({ params }: { params: Promise<{ clusterId: string }> }) {
    const { clusterId } = await params;
    let data;
    try {
        data = await prisma.clusters.findFirst({
            where: { id: clusterId },
            include: {
                ClusterVersions: {
                    include: {
                        ClusterImages: true
                    }
                }
            }
        })
    } catch (error) {
        console.log(error);
    }

    if (!data) {
        return (
            <div>
                Something went wrong
            </div>
        )
    }

    return (
        <div>
           <ClusterDashboard data={data}/> 
        </div>
    )
}
