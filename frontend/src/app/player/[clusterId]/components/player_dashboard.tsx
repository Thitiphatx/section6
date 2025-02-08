"use client"

import { Card } from "primereact/card"
import PlayerPanel from "./player_panel"
import PlayerController from "./player_controller"

export default function PlayerDashboard() {
    return (
        <Card>
            <div className="grid grid-cols-2">
                {/* player */}
                <PlayerPanel />

                {/* controller */}
                <PlayerController />
            </div>
        </Card>
    )
}
