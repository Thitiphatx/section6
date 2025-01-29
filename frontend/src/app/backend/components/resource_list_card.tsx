"use client"

import { Resources } from "@prisma/client"
import Link from "next/link"

export default function ResourceListCard({ data }: { data: Resources }) {
    return (
        <Link href={`/backend/resources/${data.id}`}>
            <div className="card bg-base-100 text-neutral-content">
                <div className="card-body flex-row items-center text-center p-3 gap-5">
                    <div>
                        <button className="btn btn-accent">Ready</button>
                    </div>
                    <div>
                        <h2 className="card-title">{data.name}</h2>
                        <p>{data.created_at.toDateString()}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
