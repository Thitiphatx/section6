"use server"

import prisma from "@/libs/prisma"

export default async function update_cluster_version(clusterVersionId: string, basePrice: number, classPrice: number) {
	try {
		await prisma.clusterVersions.update({
			where: { id: clusterVersionId },
			data: {
				price: basePrice,
				price_per_class: classPrice
			}

		})
	} catch (error) {
		return { message: "Database is offline" }
	}
}
