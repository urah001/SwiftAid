import { NextResponse } from "next/server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession()
    const user = await getUser()
    const isAuth = await isAuthenticated()

    if (!isAuth || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get reports submitted by the user
    const reports = await prisma.emergency.findMany({
      where: {
        OR: [{ reporterMatNo: user.email }, { victimMatNo: user.email }],
      },
      orderBy: { createdAt: "desc" },
      take: 10, // Limit to 10 most recent
    })

    return NextResponse.json({ reports })
  } catch (error) {
    console.error("Error fetching user reports:", error)
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 })
  }
}
