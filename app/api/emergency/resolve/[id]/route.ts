import { NextResponse } from "next/server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import { isClinicStaff } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
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

    const { id } = params

    // Update emergency status
    const emergency = await prisma.emergency.update({
      where: { id },
      data: {
        status: "resolved",
        resolvedAt: new Date(),
        resolvedById: user.id,
      },
    })

    return NextResponse.json({ success: true, emergency })
  } catch (error) {
    console.error("Error resolving emergency:", error)
    return NextResponse.json({ error: "Failed to resolve emergency" }, { status: 500 })
  }
}
