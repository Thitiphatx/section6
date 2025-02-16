import { Prisma } from '@prisma/client';

export type ClusterWithVersionImage = Prisma.ClustersGetPayload<{
    include: {
        ClusterVersions: {
            include: {
                ClusterImages: true;
            };
        };
    };
}>;