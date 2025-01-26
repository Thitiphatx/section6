"use client"

import { Images } from "@prisma/client"

export default function ResourceImageTable({ ImageList }: { ImageList: Images[] }) {
    return (
        <div className="overflow-y-scroll max-h-screen">
        <table className="table table-xs">
            <thead>
                <tr>
                    <th>status</th>
                    <th>file_name</th>
                    <th>latitude</th>
                    <th>longitude</th>
                    <th>timestamp</th>
                    <th>file_path</th>
                </tr>
            </thead>
            <tbody>
            {ImageList.map((image) => (
                <tr key={image.id}>
                    <td>
                        {image.file_path ? (
                            <p className="text-green-500">Have</p>
                        ) :
                        (<p className="text-red-500">Not</p>)
                    }
                    </td>
                    <td>
                        {image.file_name}
                    </td>
                    <td>
                        {image.latitude}
                    </td>
                    <td>
                        {image.longitude}
                    </td>
                    <td>
                        {image.timestamp.toISOString()}
                    </td>
                    <td>
                        {image.file_path}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>        
        </div>
    )
}
