"use client"

import { DataTable } from "primereact/datatable";
import { useResourceContext } from "../(page)/resources/[resourceId]/context";
import { Column } from "primereact/column";
import { useState } from "react";
import { Images } from "@prisma/client";

export default function ResourceImageTable() {
    const data = useResourceContext();
    const [images] = useState<Images[]>(data.Images);
    return (

        <DataTable value={images} removableSort size="small">
            <Column sortable field="file_name" header="File Name"></Column>
            <Column sortable field="latitude" header="Latitude"></Column>
            <Column sortable field="longitude" header="Longitude"></Column>
        </DataTable>
    )
}