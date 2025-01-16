import { prisma } from "@/app/lib/prisma"

interface ResourcePageProps {
	params: Promise<{ resourceId: string }>; // params is now a Promise
}

export default async function ResourcePage({ params }: ResourcePageProps) {
	const { resourceId } = await params; // Await the params to extract resourceId
  	const id = parseInt(resourceId, 10);
	const data = await prisma.resources.findFirst({
		where: {
			id: id
		},
		include: {
			Images: true
		}
		
	})
	return (
		<div>
			<p>id: {data?.id}</p>
			<p>name: {data?.name}</p>
			<p>{data?.created_at.toDateString()}</p>
			<div className="mt-5">
				<div className="grid grid-cols-6">
					<div>status</div>
					<div>file_name</div>
					<div>latitude</div>
					<div>longitude</div>
					<div>timestamp</div>
					<div>file_path</div>
				</div>
				{data?.Images.map((image)=> (
					<div key={image.id}  className="grid grid-cols-6">
						<div>
							none
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
							{image.timestamp.toDateString()}
						</div>
						<div>
							{image.file_path}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
