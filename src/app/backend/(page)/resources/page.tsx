import { prisma } from "@/app/lib/prisma"

export default async function Page() {
    const resources_list = await prisma.resources.findMany();
    return (
        <div className="flex flex-col gap-1">
            {resources_list && (
                resources_list.map((resource)=> (
                    <div key={resource.id} className="p-2 bg-slate-800">
                        <p>name: {resource.name}</p>
                        <p>{resource.created_at.toDateString()}</p>
                    </div>
                ))
            )}
        </div>
    )
}
