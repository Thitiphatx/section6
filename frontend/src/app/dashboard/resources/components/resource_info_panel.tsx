"use client"

import { Card } from "primereact/card"
import { useResourceContext } from "../[resourceId]/context"
import { Resources } from "@prisma/client";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { useState } from "react";

export default function ResourceInfoPanel() {
    const data: Resources = useResourceContext();
    const [datetime24h, setDateTime24h] = useState(null);
    return (
        <Card title="Resource info">
            <form>
                <div className="flex flex-col gap-5">
                    <InputText defaultValue={data.name} />
                    <Calendar value={datetime24h} onChange={(e) => setDateTime24h(e.value)} showTime hourFormat="24" />
                </div>
            </form>
        </Card>
    )
}
