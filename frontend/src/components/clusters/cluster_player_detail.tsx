"use client"

import Player2 from "@/app/player/[clusterId]/components/player";
import { ClusterWithVersion } from "@/types/clusters";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { MenuItem } from "primereact/menuitem";
import { SplitButton } from "primereact/splitbutton";
import { ToggleButton } from "primereact/togglebutton";
import { useEffect, useState } from "react";

export default function ClusterDetail({ data }: { data: ClusterWithVersion }) {
    const [videoVersion, setVideoVersion] = useState(`0`);
    const [selectedClasses, setSelectedClasses] = useState(['building', 'car', 'human', 'road']);
    const [showObjectLabels, setShowObjectLabels] = useState(true);

    const videoVersionOptions = data.ClusterVersions.map((v, index) => ({
        label: `${v.version}`,
        value: `${index}`
    }))

    // Display classes for object detection
    const objectClasses = [
        { name: 'Building', key: 'building' },
        { name: 'Car', key: 'car' },
        { name: 'Human', key: 'human' },
        { name: 'Road', key: 'road' },
        { name: 'Tree', key: 'tree' },
        { name: 'Bicycle', key: 'bicycle' },
        { name: 'Traffic Light', key: 'traffic_light' },
        { name: 'Sign', key: 'sign' }
    ];


    const items: MenuItem[] = [
        {
            label: 'csv',
            icon: 'pi pi-refresh',
        },
        {
            label: 'kml',
            icon: 'pi pi-upload',
            // command: () => {
            //     //router.push('/fileupload');
            // }
        }
    ];

    useEffect(() => {

    }, [videoVersion])

    const resetToDefaults = () => {
        setVideoVersion(`${data.ClusterVersions[0].version}`);
        setSelectedClasses(['building', 'car', 'human', 'road']);
        setShowObjectLabels(true);
    };

    const applySettings = () => {

    }
    return (
        <div className="max-w-screen-xl mx-auto p-4">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Video Player Column */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="rounded-md overflow-hidden shadow-lg bg-black" >
                        <Player2 />
                    </div>

                    {/* Description Card */}
                    <Card className="shadow-md">
                        <div className="space-y-3">
                            <div>
                                <div className="flex flex-row gap-2 items-center">
                                    <i className="pi pi-map-marker"></i>
                                    <h2 className="text-xl font-bold">{data.road}</h2>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <span className="mr-2">
                                        <i className="pi pi-calendar mr-1"></i>
                                        {new Date().toLocaleDateString()}
                                    </span>
                                    <span>
                                        <i className="pi pi-eye mr-1"></i>
                                        { }
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-1 pt-1">
                                {/* {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))} */}
                            </div>

                            <div className="border-t pt-3">
                                <p className="text-gray-700">{data.address}</p>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <div className="flex gap-2">
                                    <Button icon="pi pi-thumbs-up" className="p-button-text p-button-rounded" />
                                    <Button icon="pi pi-thumbs-down" className="p-button-text p-button-rounded" />
                                    <Button icon="pi pi-share-alt" className="p-button-text p-button-rounded" />
                                </div>
                                <SplitButton label="Export" icon="pi pi-download" className="p-button-outlined" model={items} />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Settings Panel Column */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Cluster Settings</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-medium mb-2">Video Version</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm">Version:</label>
                                        <Dropdown
                                            value={videoVersion}
                                            options={videoVersionOptions}
                                            onChange={(e) => setVideoVersion(e.value)}
                                            className="w-40"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Cluster Setting Section */}
                            <div>
                                <h4 className="font-medium mb-2">Price Settings</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm">Base Price:</label>
                                        <InputNumber
                                            inputId="currency-th"
                                            // value={}
                                            // onValueChange={}
                                            mode="currency"
                                            currency="THB"
                                            locale="th-TH"
                                            className="w-full"
                                            showButtons
                                            min={0}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm">Price per class:</label>
                                        <InputNumber
                                            inputId="currency-th"
                                            // value={}
                                            // onValueChange={}
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

                            {/* Object Detection Section */}
                            <div>
                                <h4 className="font-medium mb-2">Display Settings</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm">Show On sell:</label>
                                        <ToggleButton
                                            checked={showObjectLabels}
                                            onChange={(e) => setShowObjectLabels(e.value)}
                                            onLabel="On"
                                            offLabel="Off"
                                            className="w-20"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Apply Button */}
                            <div className="pt-2">
                                <Button
                                    label="Apply"
                                    icon="pi pi-check"
                                    className="w-full"
                                    onClick={applySettings}
                                />
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
