"use client"

import { createContext, useContext } from "react";
import { ClusterWithVersionImage } from "../../../../../types/clusters";

export const ClusterContext = createContext<ClusterWithVersionImage | undefined>(undefined); 

export const useClusterContext = ()=> {
    const data = useContext(ClusterContext);

    if (!data) {
        throw new Error("useClusterContext must be used in ClusterContext")
    }
    return data;
}