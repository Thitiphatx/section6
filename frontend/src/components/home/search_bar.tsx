"use client"

import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button";

export default function SearchBar() {
    return (
        <div className="flex flex-col justify-center items-center space-y-5 w-full h-96" style={{ backgroundColor: 'var(--highlight-bg)'}}>
            <h1 className="font-bold text-5xl">Section 6</h1>
            <form className="w-[800px]">
                <div className="p-inputgroup w-full">
                    <InputText placeholder="Search" />
                    <Button icon="pi pi-search" />
                </div>
            </form>
        </div>

    )
}
