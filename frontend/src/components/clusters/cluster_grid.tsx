"use client"

import { Clusters } from "@prisma/client";
import Image from "next/image";
import { Tag } from "primereact/tag";
import Link from "next/link";
import { useClustersContext } from "@/contexts/clusters/clustersContext";

export default function ClusterGrid() {
    const data = useClustersContext();

    return (
        <div
            className="grid grid-cols-2 gap-2 min-h-screen p-2"
            style={{
                backgroundColor: "var(--surface-100)"
            }}
        >
            {data.map((item, index) => (
                <ClusterGridItem item={item} key={index} />
            ))}
        </div>
    )
}

const ClusterGridItem = ({ item }: { item: Clusters }) => {
    return (
        <Link href={`/dashboard/cluster/${item.id}`} className="h-fit">
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
                    <h3 className="font-bold text-lg">{item.address}</h3>
                    <p>ถนน {item.road}</p>
                    <div className="flex flex-row flex-nowrap items-center gap-2">
                        <Tag value="Segmented" />
                        <small>3 versions</small>
                    </div>
                </div>
            </div>
        </Link>
    )
}