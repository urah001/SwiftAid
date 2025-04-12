import { redirect } from "next/navigation"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import { getUserRole } from "@/lib/auth"

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    redirect("/api/auth/login")
  }

  const userRole = await getUserRole(user.id)

  if (userRole === "clinic") {
    redirect("/dashboard/clinic")
  } else {
    redirect("/dashboard/student")
  }
}
