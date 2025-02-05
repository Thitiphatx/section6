"use client"
import { createContext, useContext } from "react";
import { ResourceWithImage } from "./types";


export const ResourceContext = createContext<ResourceWithImage | undefined>(undefined);

export function useResourceContext() {
    const data: ResourceWithImage = useContext(ResourceContext);

    if (data === undefined) {
        throw new Error("useResourceContext must be use with ResourceContext");
    }
    return data;
}
