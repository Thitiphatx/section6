"use client"

import { Card } from "primereact/card"
import { useResourceContext } from "../[resourceId]/context"
import { Resources } from "@prisma/client";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

export default function ResourceInfoPanel() {
    const data: Resources = useResourceContext();

    return (
        <Card>
            <form>  
                    <label className="font-bold block mb-2">resource name</label>
                    <InputText defaultValue={data.name} />
                    <p className="text-sm mt-5">created at {data.created_at.toDateString()}</p>
                    <Divider />
                    <Button label="update" icon="pi pi-check" iconPos="right"/>
            </form>
        </Card>
    )
}
