import prisma from "@/app/lib/prisma";
import UserDashboard from "./components/user_dashboard";

export default async function Users() {
    const users = await prisma.users.findMany();
    return (
        <div>
            <UserDashboard data={users} />
        </div>
    )
}
