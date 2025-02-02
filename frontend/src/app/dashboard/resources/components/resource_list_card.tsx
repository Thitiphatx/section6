"use client"

import { Resources } from "@prisma/client"
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { DataScroller } from 'primereact/datascroller';
import { Menu } from "primereact/menu";
import { Tag } from "primereact/tag";
import { useRef } from "react";

export default function ResourceListCard({ resources_list }: { resources_list: Resources[] }) {
    const router = useRouter();
    const menuRight = useRef<Menu>(null);
    const menuItems = [
        {
            label: "Start"
        },
        {
            label: "Edit"
        },
        {
            label: "Delete"
        }
    ]
    const itemTemplate = (data: Resources) => {
        return (
            <div className="cursor-pointer" onClick={() => router.push(`/dashboard/resources/${data.id}`)}>
                <div className="p-5 flex flex-row justify-between">
                    <div className="flex flex-row gap-5">
                        <Tag severity="success" value="Ready"></Tag>
                        <div className="flex flex-col">
                            <span>{data.name}</span>
                            <small>{data.created_at.toDateString()}</small>
                        </div>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                        <Menu model={menuItems} popup ref={menuRight} popupAlignment="right" />
                        <Button icon="pi pi-ellipsis-v" severity="secondary" text rounded className="mr-2" onClick={(event) => menuRight?.current?.toggle(event)} />
                    </div>
                </div>
            </div>
        )
}
return (
    <DataScroller value={resources_list} itemTemplate={itemTemplate} rows={5} inline buffer={0.4} header="List of Products" />
)
}
