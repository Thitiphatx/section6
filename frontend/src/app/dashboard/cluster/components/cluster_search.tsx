"use client"

import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"

export default function ClusterSearch() {
    return (
        <form>
            <div className="p-inputgroup flex-1">
                <InputText placeholder="type in road..." />
                <Button icon="pi pi-search" className="p-button-primary" />
            </div>
        </form>
    )
}
