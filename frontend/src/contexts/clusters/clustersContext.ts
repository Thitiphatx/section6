"use client"

import { Clusters } from "@prisma/client";
import { createContext, useContext } from "react";

export const ClustersContext = createContext<Clusters[] | undefined>(undefined); 

export const useClustersContext = ()=> {
    const data = useContext(ClustersContext);

    if (!data) {
        throw new Error("useClustersContext must be used in ClustersContext")
    }
    return data;
}