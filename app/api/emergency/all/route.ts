import { NextResponse } from "next/server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { isClinicStaff } from "@/lib/auth"
import { prisma } from "@/lib/db"

// Set this to true to bypass authentication during development
const BYPASS_AUTH_FOR_TESTING = true

export async function GET() { 
  try {
    // Skip authentication check if bypass flag is enabled
    if (!BYPASS_AUTH_FOR_TESTING) {
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
    }

    // Mock data for testing when database is not set up
    const mockActive = [
      {
        id: "mock-emergency-1",
        emergencyType: "medical",
        location: "Science Building",
        description: "Student feeling dizzy and having trouble breathing",
        reporterMatNo: "22L1CY123",
        victimMatNo: "22L1CY456",
        status: "active",
        createdAt: new Date().toISOString(),
        medicalInfo: {
          allergies: "Dust",
          conditions: "Asthma",
          medications: "Ventolin inhaler",
        },
      },
      {
        id: "mock-emergency-2",
        emergencyType: "injury",
        location: "Sports Complex",
        description: "Student fell during basketball practice, possible ankle sprain",
        reporterMatNo: "20L1CY456",
        victimMatNo: "20L1CY891",
        status: "active",
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        medicalInfo: null,
      },
    ]

    const mockResolved = [
      {
        id: "mock-emergency-3",
        emergencyType: "medical",
        location: "Dormitory A",
        description: "Student with severe headache and fever",
        reporterMatNo: "20L1CY456",
        victimMatNo: "20L1CY456",
        status: "resolved",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        medicalInfo: null,
      },
    ]

    try {
      // Try to get real data from database
      const active = await prisma.emergency.findMany({
        where: { status: "active" },
        orderBy: { createdAt: "desc" },
        include: { medicalInfo: true },
      })

      const resolved = await prisma.emergency.findMany({
        where: { status: "resolved" },
        orderBy: { createdAt: "desc" },
        take: 20,
        include: { medicalInfo: true },
      })

      return NextResponse.json({ active, resolved })
    } catch (dbError) {
      // If database error, return mock data
      console.log("Using mock data due to database error:", dbError)
      return NextResponse.json({ active: mockActive, resolved: mockResolved })
    }
  } catch (error) {
    console.error("Error fetching emergencies:", error)
    return NextResponse.json({ error: "Failed to fetch emergencies" }, { status: 500 })
  }
}
