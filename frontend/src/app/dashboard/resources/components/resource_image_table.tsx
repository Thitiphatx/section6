"use client"

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { Images } from "@prisma/client";
import { useResourceContext } from "../[resourceId]/context";
import { Card } from "primereact/card";

export default function ResourceImageTable() {
    const data = useResourceContext();
    const [images] = useState<Images[]>(data.Images);
    return (
        <Card title="Resource image table">
            <DataTable value={images} removableSort size="small">
                <Column sortable field="file_name" header="File Name"></Column>
                <Column sortable field="latitude" header="Latitude"></Column>
                <Column sortable field="longitude" header="Longitude"></Column>
            </DataTable>
        </Card>
    )
}