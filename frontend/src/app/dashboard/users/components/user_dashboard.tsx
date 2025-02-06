"use client"

import { Users } from "@prisma/client"
import { UserContext } from "../utils/context"
import UserTable from "./user_table"

export default function UserDashboard({ data }: { data: Users[] }) {
  return (
    <UserContext.Provider value={data}>
        <UserTable />
    </UserContext.Provider>
  )
}
