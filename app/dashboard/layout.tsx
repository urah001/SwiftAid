import type React from "react";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { DashboardNav } from "@/components/dashboard-nav";
import { UserNav } from "@/components/user-nav";
import { getUserRole } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const data = {
  //   id: "1jhsb7623fdqwd6bqwyqfgwb87q",
  //   email: "anon6445@gmail.com",
  //   given_name: "xam",
  //   family_name: "well",
  // };
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const isAuth = await isAuthenticated();

  if (!isAuth || !user) {
    redirect("/api/auth/login");
    // console.log("create account")
  }

  const userRole = await getUserRole(user.id);
  // const userRole = await getUserRole(data.id);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">MedAlert</span>
            <span>Response System</span>
          </div>
          <UserNav user={user} />
          {/* <UserNav
            user={{
              id: user.id,
              email: user.email ?? undefined,
              given_name: user.given_name ?? undefined,
              family_name: user.family_name ?? undefined,
            }}
          /> */}

          {/* <UserNav user={data} /> */}
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav userRole={userRole} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
