import { prisma } from "@/lib/db"

// Function to get user role from database
export async function getUserRole(userId: string): Promise<"student" | "clinic"> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    })

    return (user?.role as "student" | "clinic") || "student"
  } catch (error) {
    console.error("Error fetching user role:", error)
    return "student" // Default to student role if error
  }
}

// Function to check if user is clinic staff
export async function isClinicStaff(userId: string): Promise<boolean> {
  const role = await getUserRole(userId)
  return role === "clinic"
}

// Function to create or update user in database after Kinde auth
export async function upsertUser(userData: {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role?: "student" | "clinic"
}) {
  try {
    await prisma.user.upsert({
      where: { id: userData.id },
      update: {
        email: userData.email,
        firstName: userData.firstName || undefined,
        lastName: userData.lastName || undefined,
        role: userData.role || undefined,
      },
      create: {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName || null,
        lastName: userData.lastName || null,
        role: userData.role || "student", // Default to student role
      },
    })

    return true
  } catch (error) {
    console.error("Error upserting user:", error)
    return false
  }
}
