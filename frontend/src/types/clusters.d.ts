import { Prisma } from '@prisma/client';

export type ClusterWithVersion = Prisma.ClustersGetPayload<{
    include: {
        ClusterVersions: true
    };
}>;


export type ClustersContextType = {
    clusters: Clusters[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}