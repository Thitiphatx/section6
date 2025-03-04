"use client"

import Player2 from "@/app/player/[clusterId]/components/player";
import update_cluster_version from "@/features/cluster/update_cluster_version";
import { ClusterWithVersion } from "@/types/clusters";
import { ClusterVersions } from "@prisma/client";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { MenuItem } from "primereact/menuitem";
import { SplitButton } from "primereact/splitbutton";
import { ToggleButton } from "primereact/togglebutton";
import { useState } from "react";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export default function ClusterDetail({ data }: { data: ClusterWithVersion }) {
    const toast = useRef<Toast>(null);
    const [videoVersion, setVideoVersion] = useState(`0`);
    const [showObjectLabels, setShowObjectLabels] = useState(true);
    const [selectedVersion, setSelectedVersion] = useState<ClusterVersions>(data.ClusterVersions[0]);
    const [loading, setLoading] = useState<boolean>(false);

    const [price, setPrice] = useState({
        basePrice: selectedVersion.price,
        classPrice: selectedVersion.price_per_class
    });

    const videoVersionOptions = data.ClusterVersions.map((v, index) => ({
        label: `Version ${v.version}`,
        value: `${index}`
    }));
    
    const items: MenuItem[] = [
        {
            label: 'Export as CSV',
            icon: 'pi pi-file-excel',
            className: 'text-green-600'
        },
        {
            label: 'Export as KML',
            icon: 'pi pi-map',
            className: 'text-blue-600'
        },
        {
            label: 'Export as JSON',
            icon: 'pi pi-code',
            className: 'text-purple-600'
        }
    ];

    const applySettings = async () => {
        setLoading(true);
        try {
            await update_cluster_version(selectedVersion.id, price.basePrice, price.classPrice);
            toast.current?.show({
                severity: 'success',
                summary: 'Settings Applied',
                detail: 'Cluster settings have been updated successfully',
                life: 3000
            });
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update cluster settings',
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    }

    const changeVersion = (e: DropdownChangeEvent) => {
        setVideoVersion(e.value);

        const versionOption = data.ClusterVersions.find((_, index) => index === parseInt(e.value));
        if (versionOption) {
            setSelectedVersion(versionOption);
            setPrice({
                basePrice: versionOption.price,
                classPrice: versionOption.price_per_class
            });
        }
    }

    return (
        <div className="max-w-screen-xl mx-auto min-h-screen">
            <Toast ref={toast} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Video Player Column */}
                <div className="lg:col-span-2 space-y-5">
                    <Card className="shadow-lg border-0 overflow-hidden">
                        <div className="rounded-md overflow-hidden bg-black">
                            <Player2 />
                        </div>
                    </Card>

                    {/* Description Card */}
                    <Card className="shadow-md border-0">
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <i className="pi pi-map-marker text-blue-500"></i>
                                        <h2 className="text-xl font-bold text-gray-800">{data.road}</h2>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mt-2">
                                        <span className="mr-3 flex items-center">
                                            <i className="pi pi-calendar mr-1"></i>
                                            {new Date().toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <SplitButton
                                        label="Export"
                                        icon="pi pi-download"
                                        className="p-button-outlined p-button-info"
                                        model={items}
                                    />
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text-md font-semibold mb-2">Location Details</h3>
                                <p className="text-gray-700">{data.address}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Settings Panel Column */}
                <div className="lg:col-span-1">
                    <Card className="shadow-lg border-0">
                        <div className="p-1">
                            <h3 className="text-xl font-semibold mb-5 pb-2 border-b border-gray-200 flex items-center">
                                <i className="pi pi-cog mr-2 text-blue-500"></i>
                                Cluster Settings
                            </h3>
                            <div className="space-y-6">
                                {/* Video Version Section */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-3 flex items-center">
                                        <i className="pi pi-video mr-2 text-blue-500"></i>
                                        Video Version
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-medium text-gray-700">Select Version:</label>
                                            <Dropdown
                                                value={videoVersion}
                                                options={videoVersionOptions}
                                                onChange={changeVersion}
                                                className="w-48"
                                                placeholder="Select Version"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Price Settings Section */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-3 flex items-center">
                                        <i className="pi pi-dollar mr-2 text-green-500"></i>
                                        Price Settings
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 block mb-1">Base Price:</label>
                                            <InputNumber
                                                value={price.basePrice}
                                                onValueChange={(e) => setPrice((prev) => ({ ...prev, basePrice: e.value || 0 }))}
                                                mode="currency"
                                                currency="THB"
                                                locale="th-TH"
                                                className="w-full"
                                                showButtons
                                                min={0}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 block mb-1">Price per class:</label>
                                            <InputNumber
                                                value={price.classPrice}
                                                onValueChange={(e) => setPrice((prev) => ({ ...prev, classPrice: e.value || 0 }))}
                                                mode="currency"
                                                currency="THB"
                                                locale="th-TH"
                                                className="w-full"
                                                showButtons
                                                min={0}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Display Settings Section */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-3 flex items-center">
                                        <i className="pi pi-eye mr-2 text-purple-500"></i>
                                        Display Settings
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-gray-700">Show On sell:</label>
                                            <ToggleButton
                                                checked={showObjectLabels}
                                                onChange={(e) => setShowObjectLabels(e.value)}
                                                onLabel="On"
                                                offLabel="Off"
                                                className="w-24"
                                                onIcon="pi pi-check"
                                                offIcon="pi pi-times"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Apply Button */}
                                <div className="pt-2">
                                    <Button
                                        label="Apply Changes"
                                        icon="pi pi-check"
                                        className="w-full p-button-raised p-button-primary"
                                        loading={loading}
                                        onClick={applySettings}
                                    />
                                    <Button
                                        label="Reset"
                                        icon="pi pi-refresh"
                                        className="w-full mt-2 p-button-outlined p-button-secondary"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}