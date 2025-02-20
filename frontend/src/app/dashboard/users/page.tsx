import prisma from "@/app/lib/prisma";
import UserDashboard from "./components/user_dashboard";
import ErrorPage from "@/app/components/error";

export default async function Users() {
    try {
        const users = await prisma.users.findMany();
        return (
            <div>
                <UserDashboard data={users} />
            </div>
        )
    } catch (error) {
        return (
            <ErrorPage message="Database is offline"/>
        )
    }

}
