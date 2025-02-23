"use client"

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { Images } from "@prisma/client";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { useResourceContext } from "@/contexts/resources/context";

export default function ResourceImageTable() {
    const data = useResourceContext();
    const [images] = useState<Images[]>(data.Images);
    
    const statusBodyTemplate = (image: Images) => {
        let severity: null | "success" | "warning" | "secondary" | "info" | "danger" | "contrast";
        switch (image.status) {
            case "AVAILABLE":
                severity = "success";
                break;
            case "FAILED":
                severity = "danger";
                break;
            case "PENDING":
                severity = "warning";
                break;
            case "PROCESSING":
                severity = "info";
                break;
        }
        return <Tag value={image.status} severity={severity}></Tag>;
    }

    return (
        <Card title="Resource image table">
            <DataTable value={images} removableSort size="small" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                <Column sortable field="status" header="Status" body={statusBodyTemplate}></Column>
                <Column sortable field="file_name" header="File Name"></Column>
                <Column sortable field="latitude" header="Latitude"></Column>
                <Column sortable field="longitude" header="Longitude"></Column>
            </DataTable>
        </Card>
    )
}