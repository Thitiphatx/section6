"use client"

import { Resources, ResourceStatus } from "@prisma/client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tag } from "primereact/tag";
import { DataView } from "primereact/dataview";
import Image from "next/image";
import { Button } from "primereact/button";

export default function ResourceListCard({ resources_list }: { resources_list: Resources[] }) {
    const router = useRouter();
    const statusColor = (status: ResourceStatus) => {
        switch (status) {
            case "PENDING":
                return "warning"
            case "READY":
                return "success"
        };
    }

    const itemTemplate = (data: Resources) => {
        return (
            <Link href={`/dashboard/resources/${data.id}`} key={data.id} className="h-fit">
                <div
                    className="rounded-xl h-32 flex flex-row flex-nowrap"
                    style={{
                        backgroundColor: "var(--surface-card)"
                    }}
                >
                    <div className="h-full relative before:content-[''] before:absolute before:right-0 before:top-0 before:h-full before:w-5 before:rounded-l-xl before:bg-white">
                        <Image className="rounded-xl w-full h-full" alt="" width={100} height={200} src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" />
                    </div>
                    <div className="pt-5">
                        <h3 className="font-bold text-lg">{data.name}</h3>
                        <p>{data.created_at.toDateString()}</p>
                        <div className="flex flex-row flex-nowrap items-center gap-2">
                            <Tag value={data.status} severity={statusColor(data.status)} />
                            {/* <small>3 versions</small> */}
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    const listTemplate = (data: Resources[]) => {
        return (
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 p-5 bg-zinc-100">
                {data.map((resource: Resources) => itemTemplate(resource))}
            </div>
        )

    };

    return (
        <div className="min-h-full">
            <DataView
                pt={{
                    content: {
                        className: "min-h-[calc(100vh-15rem)]"
                    }
                }}
                value={resources_list} 
                itemTemplate={itemTemplate} 
                listTemplate={listTemplate} 
                paginator 
                rows={5} 
                layout={"grid"} 
                header={<div className="flex justify-between items-center">
                    <h1>list of resources</h1>
                    <Button onClick={()=> router.push("/dashboard/import")} icon="pi pi-plus" label="import resource" />
                </div>}
            />
        </div>
    )
}
