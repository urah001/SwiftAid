import { NextResponse } from "next/server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import { isClinicStaff } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession()
    const user = await getUser()
    const isAuth = await isAuthenticated()

    if (!isAuth || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is clinic staff
    const isClinic = await isClinicStaff(user.id)

    if (!isClinic) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Get active emergencies
    const active = await prisma.emergency.findMany({
      where: { status: "active" },
      orderBy: { createdAt: "desc" },
      include: { medicalInfo: true },
    })

    // Get resolved emergencies
    const resolved = await prisma.emergency.findMany({
      where: { status: "resolved" },
      orderBy: { createdAt: "desc" },
      take: 20, // Limit to 20 most recent
      include: { medicalInfo: true },
    })

    return NextResponse.json({ active, resolved })
  } catch (error) {
    console.error("Error fetching emergencies:", error)
    return NextResponse.json({ error: "Failed to fetch emergencies" }, { status: 500 })
  }
}
