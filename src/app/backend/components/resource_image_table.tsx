"use client"

import { Images } from "@prisma/client"

export default function ResourceImageTable({ ImageList }: { ImageList: Images[] }) {
    return (
        <div className="mt-5">
            <div className="grid grid-cols-6">
                <div>status</div>
                <div>file_name</div>
                <div>latitude</div>
                <div>longitude</div>
                <div>timestamp</div>
                <div>file_path</div>
            </div>
            {ImageList.map((image) => (
                <div key={image.id} className="grid grid-cols-6">
                    <div>
                        {image.file_path ? (
                            <p className="text-green-500">Have</p>
                        ) :
                        (<p className="text-red-500">Not</p>)
                    }
                    </div>
                    <div>
                        {image.file_name}
                    </div>
                    <div>
                        {image.latitude}
                    </div>
                    <div>
                        {image.longitude}
                    </div>
                    <div>
                        {image.timestamp.toISOString()}
                    </div>
                    <div>
                        {image.file_path}
                    </div>
                </div>
            ))}
        </div>
    )
}
