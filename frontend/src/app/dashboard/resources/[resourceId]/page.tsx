import prisma from "@/app/lib/prisma"
import ResourceDashboard from "../components/resource_dashboard";
import ErrorPage from "@/app/components/error";

interface ResourcePageProps {
	params: Promise<{ resourceId: string }>; // params is now a Promise
}

export default async function ResourcePage({ params }: ResourcePageProps) {
	const { resourceId } = await params; // Await the params to extract resourceId

	try {
		const data = await prisma.resources.findFirst({
			where: { id: resourceId },
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
	} catch (error) {
		<ErrorPage message="Database is offline"/>
	}

}
