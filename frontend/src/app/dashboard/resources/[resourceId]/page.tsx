import prisma from "@/app/lib/prisma"
import ResourceDashboard from "../components/resource_dashboard";

interface ResourcePageProps {
	params: Promise<{ resourceId: string }>; // params is now a Promise
}

export default async function ResourcePage({ params }: ResourcePageProps) {
	const { resourceId } = await params; // Await the params to extract resourceId

  	const id = parseInt(resourceId, 10);

	const data = await prisma.resources.findFirst({
		where: { id: id },
		include: { Images: true }
	})

	if (!data) {
		return (
			<div>
				No data
			</div>
		)
	}
	return (
		<div>
			<ResourceDashboard data={data} />
		</div>
	)
}
