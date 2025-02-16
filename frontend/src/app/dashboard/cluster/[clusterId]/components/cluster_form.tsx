"use client"

import { Dropdown } from "primereact/dropdown"
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from "primereact/selectbutton";
import { useState } from "react";
import { useClusterContext } from "../utils/context";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

export default function ClusterForm() {
    const data = useClusterContext();
    const [selectedVersion, setSelectedVersion] = useState<null>(null);
    const [value, setValue] = useState(null);
    const items = [
        { name: 'เสาไฟ', value: 1 },
        { name: 'ถนน', value: 2 },
        { name: 'ต้นไม้', value: 3 }
    ];
    const items2 = data.ClusterVersions.map((v) => (
        {
            name: v.created_at.toDateString(),
            code: v.version
        }
    ))

    return (
        <form>
            <Dropdown
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.value)}
                options={items2}
                optionLabel="name"
                placeholder="Select a Version"
                className="w-full" />
            <InputTextarea value={data.address} className="w-full" />
            <SelectButton value={value} onChange={(e) => setValue(e.value)} optionLabel="name" options={items} multiple />
            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">ราคา</span>
                <InputNumber placeholder="Price" />
                <span className="p-inputgroup-addon">บาท</span>
            </div>
            <div className="flex flex-row justify-between">
                <Button label="update"/>
                <Button label="delete" severity="danger"/>
            </div>
        </form>
    )
}
