import prisma from "@/libs/prisma";
import ErrorPage from "@/components/error";
import ClusterDetail from "@/components/clusters/cluster_detail";

export default async function ClusterPage({ params }: { params: Promise<{ clusterId: string }> }) {
    const { clusterId } = await params;
    const data = await prisma.clusters.findFirst({
        where: { id: clusterId },
        include: { ClusterVersions: true }
    })

    if (!data) {
        return (
            <ErrorPage message="Cluster does not exist"/>
        )
    }

    return (
        <div>
            <ClusterDetail data={data}/>
            {/* <VideoPlayer /> */}
        </div>
    )
}
