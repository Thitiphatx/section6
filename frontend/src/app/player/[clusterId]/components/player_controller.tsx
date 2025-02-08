"use client"

import { MultiSelect } from "primereact/multiselect"
import { useState } from "react";

interface City {
    name: string;
    code: string;
}

export default function PlayerController() {
    const [selectedCities, setSelectedCities] = useState<City | null>(null);
    const cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    return (
        <div>
            <form>
                <MultiSelect
                    value={selectedCities}
                    onChange={(e) => setSelectedCities(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Select Cities"
                    maxSelectedLabels={3}
                    className="w-full md:w-20rem"
                />
            </form>
        </div>
    )
}
