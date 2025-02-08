import PlayerDashboard from "./components/player_dashboard";

export default async function Player({ params }: { params: Promise<{ clusterId: string }> }) {
    const { clusterId } = await params;
    return (
        <div>
            <PlayerDashboard />
        </div>
    )
}
