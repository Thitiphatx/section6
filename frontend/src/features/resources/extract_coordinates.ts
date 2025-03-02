"use server"

import prisma from "@/libs/prisma";
import { ResourceWithImage } from "@/types/resources";
import { Clusters, Images } from "@prisma/client";

// https://nominatim.openstreetmap.org/reverse?lat=51.5074&lon=-0.1278&format=json

interface AddressData {
    place_id: number,
    licence: string,
    osm_type: string,
    osm_id: number,
    lat: string,
    lon: string,
    class: string,
    type: string,
    place_rank: number,
    importance: number,
    addresstype: string,
    name: string,
    display_name: string,
    address: Address,
    boundingbox: string[]
}

interface Address {
    road: string,
    quarter: string,
    suburb: string,
    city: string,
    postcode: string,
    country: string,
    country_code: string
}

interface ImageWithAddress {
    image: Images
    address: string;
    road: string;
}

type ProgressStore = {
    [processId: string]: number;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let progress: ProgressStore = {};

export const extract_coordinates = async (resource: ResourceWithImage) => {
    progress[resource.id] = 0;
    const uniqueRoads = new Set<string>();
    const grouped: Record<string, ImageWithAddress[]> = {};
    console.log("start");

    // 1. Convert lat & lon to address then group by road
    for (const image of resource.Images) {
        console.log(image);
        const result: AddressData = await reverse_geocode(image.latitude, image.longitude);
        if (!result) continue;
        
        progress[resource.id] += 1;

        if (uniqueRoads.has(result.address.road)) {
            if (!grouped[result.address.road]) {
                grouped[result.address.road] = [];
            }
        } else {
            uniqueRoads.add(result.address.road);
            grouped[result.address.road] = [];
        }

        grouped[result.address.road].push({
            image: image,
            address: result.display_name,
            road: result.address.road
        });

        await delay(1000); // Prevent API blocking
    }

    console.log("finish step 1");

    // 2. Put images into new cluster version
    for (const road of uniqueRoads) {
        const cluster = await getCluster(road, grouped[road][0].address);
        const version = await getClusterVersion(cluster.id);

        // Update images to associate them with the correct cluster version
        const clusterImages = grouped[road].map(images => ({
            version_id: version.id,  // Set the cluster version for the image
            image_id: images.image.id
        }));

        if (clusterImages.length > 0) {
            // Update images with the new cluster version ID
            await prisma.images.updateMany({
                where: {
                    id: {
                        in: clusterImages.map(ci => ci.image_id),
                    },
                },
                data: {
                    version_id: version.id,  // Update the version_id field in the Images table
                },
            });
        }
    }

    console.log("finish step 2");
};

const reverse_geocode = async (lat: number, lon: number) => {
    console.log("reversing")
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null
    }
}

const getCluster = async (road: string, address: string): Promise<Clusters> => {
    let cluster = await prisma.clusters.findFirst({
        where: { road },
    })

    if (!cluster) {
        cluster = await prisma.clusters.create({
            data: {
                name: road,
                road: road,
                address: address,
            },
        })
    }
    console.log("getCluster")
    return cluster
}

const getClusterVersion = async (clusterId: string) => {
    const versions = await prisma.clusterVersions.findMany({
        where: { cluster_id: clusterId }
    })


    let newVersion;
    if (versions.length === 0) {
        newVersion = await prisma.clusterVersions.create({
            data: {
                cluster_id: clusterId,
                price: 99999,
                version: 1
            }
        })
    } else {
        let newVersionNum = Math.max(...versions.map(v => v.version)) + 1;
        newVersion = await prisma.clusterVersions.create({
            data: {
                cluster_id: clusterId,
                price: 99999,
                version: newVersionNum
            }
        })
    }
    console.log("getClusterVersion")
    return newVersion;
}

export const getExtractProgress = async (processId: string)=> {
    return progress[processId];
}
