import { redirect } from "next/navigation"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getUserRole } from "@/lib/auth"

export default async function DashboardPage() {
  // const data = {
  //   id: "1jhsb7623fdqwd6bqwyqfgwb87q",
  //   email: "anon6445@gmail.com",
  //   given_name: "xam",
  //   family_name: "well",
  // };
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    redirect("/api/auth/login")
    //console.log("create acc")
  }

  const userRole = await getUserRole(user.id)

  if (userRole === "clinic") {
    redirect("/dashboard/clinic")
  } else {
    redirect("/dashboard/student")
  }
}
