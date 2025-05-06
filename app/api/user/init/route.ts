// app/api/user/init/route.ts

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { upsertUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await upsertUser({
    id: user.id,
    email: user.email || "",
    firstName: user.given_name || "",
    lastName: user.family_name || "",
  });

  return NextResponse.json({ success: true });
}
