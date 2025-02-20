import prisma from "@/app/lib/prisma"
import ResourceListCard from "./components/resource_list_card";
import ErrorPage from "@/app/components/error";

export default async function Page() {
    try {
        const resources_list = await prisma.resources.findMany();
        return (
            <div className="flex flex-col gap-1">
                <ResourceListCard resources_list={resources_list} />
            </div>
        )
    } catch (error) {
        return (
            <div>
                <ErrorPage message="Database is offline"/>
            </div>
        )
    }
}
