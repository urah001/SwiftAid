// app/api/auth/login/route.ts

import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { upsertUser, getUserRole } from "@/lib/auth";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    // Not logged in, redirect to Kinde login
    redirect("https://urservices.kinde.com/"); // Replace with actual Kinde login URL if needed
  }

  const userData = {
    id: user.id,
    email: user.email || "",
    firstName: user.given_name || "",
    lastName: user.family_name || "",
  };

  // Save or update user in your database
  await upsertUser(userData);

  // Get role and redirect accordingly
  const role = await getUserRole(user.id);

  if (role === "clinic") {
    redirect("/dashboard/clinic");
  } else {
    redirect("/dashboard/student");
  }
}
