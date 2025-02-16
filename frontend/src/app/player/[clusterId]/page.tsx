import VideoPlayer from "./components/player";
import VideoPlayer2 from "./components/Player2";

export default async function Player({ params }: { params: Promise<{ clusterId: string }> }) {
    const { clusterId } = await params;
    return (
        <div>
            <VideoPlayer2 />
            {/* <VideoPlayer videoSrc="/test2.mp4" /> */}
            {/* <PlayerDashboard /> */}
        </div>
    )
}
