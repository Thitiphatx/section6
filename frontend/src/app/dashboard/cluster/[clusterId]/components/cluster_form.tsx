"use client"

import { Dropdown } from "primereact/dropdown"
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from "primereact/selectbutton";
import { useEffect, useState } from "react";
import { useClusterContext } from "../utils/context";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";

export default function ClusterForm() {
    const data = useClusterContext();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            version_index: 0,
            address: data.address,
            price: data.ClusterVersions[0].price ?? 0
        }
    });

    const [selectedVersion, setSelectedVersion] = useState<number>(0);
    const [value, setValue] = useState(null);
    const items = [
        { name: 'เสาไฟ', value: 1 },
        { name: 'ถนน', value: 2 },
        { name: 'ต้นไม้', value: 3 }
    ];
    const items2 = data.ClusterVersions.map((v, index) => (
        {
            name: v.created_at.toDateString(),
            index
        }
    ))

    return (
        <form className="space-y-2">
            <Dropdown
                value={selectedVersion}
                defaultValue={1}
                onChange={(e) => {
                    setSelectedVersion(e.value)
                }}
                options={items2}
                optionLabel="name"
                placeholder="Select a Version"
                className="w-full" />
            <InputTextarea {...register("address")} className="w-full h-32" />
            <SelectButton value={value} onChange={(e) => setValue(e.value)} optionLabel="name" options={items} multiple />
            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">ราคา</span>
                <InputNumber {...register("price")} placeholder="Price" />
                <span className="p-inputgroup-addon">บาท</span>
            </div>
            <div className="flex flex-row justify-between">
                <Button label="update" />
                <Button label="delete" severity="danger" />
            </div>
        </form>
    )
}
