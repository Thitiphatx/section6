import ResourceImageTable from "@/app/backend/components/resource_image_table";
import ResourceImageUpload from "@/app/backend/components/resource_image_upload";
import { prisma } from "@/app/lib/prisma"

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

	return (
		<div>
			<p>id: {data?.id}</p>
			<p>name: {data?.name}</p>
			<p>{data?.created_at.toDateString()}</p>
			{data ? 
				(
					<>
						<ResourceImageUpload CurrentList={data?.Images} id={data?.id}/>
						<ResourceImageTable ImageList={data?.Images}/>
					</>
					
				) : (
					<p>No images</p>
				)
			}

		</div>
	)
}
