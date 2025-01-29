import { prisma } from "@/app/lib/prisma"
import ResourceListCard from "../../components/resource_list_card";

export default async function Page() {
    const resources_list = await prisma.resources.findMany();
    return (
        <div className="flex flex-col gap-1">
            {resources_list && (
                resources_list.map((resource) => (
                    <ResourceListCard key={resource.id} data={resource} />
                ))
            )}
        </div>
    )
}
