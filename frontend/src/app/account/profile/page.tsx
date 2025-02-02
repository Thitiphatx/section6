import { auth } from "@/app/lib/auth";
import ProfileDashboard from "./components/profile_dashboard";
import prisma from "@/app/lib/prisma";

export default async function Profile() {
    const session = await auth();
    if (!session) return <div>Unauthorized</div>;

    const user = await prisma.users.findFirst({
        where: { email: session?.user.email as string }
    })
    if (!user) return <div>User not found</div>;

    return (
        <div>
            <ProfileDashboard data={user} />
        </div>
    )
}
