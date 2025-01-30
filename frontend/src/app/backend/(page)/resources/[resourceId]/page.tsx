import ResourceControlPanel from "@/app/backend/components/resource_control_panel";
import ResourceImageTable from "@/app/backend/components/resource_image_table";
import ResourceImageUpload from "@/app/backend/components/resource_image_upload";
import prisma from "@/app/lib/prisma"
import { ResourceContext } from "./context";
import ResourceDashboard from "@/app/backend/components/resource_dashboard";

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
