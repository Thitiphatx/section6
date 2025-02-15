import prisma from "@/app/lib/prisma";

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
        console.log(data);
    } catch (error) {
        console.log(error);
    }
    return (
        <div>{clusterId}</div>
    )
}
