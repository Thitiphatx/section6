"use client"
import { Clusters } from "@prisma/client";
import { createContext, useContext } from "react";

export const ClusterContext = createContext<Clusters[] | undefined>(undefined); 

export const useClusterContext = ()=> {
    const data = useContext(ClusterContext);

    if (!data) {
        throw new Error("useClusterContext must be used in ClusterContext")
    }
    return data;
}