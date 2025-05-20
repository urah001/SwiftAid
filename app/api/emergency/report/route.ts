import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();
    const isAuth = await isAuthenticated();

    // this conditional statement is used to check if user is a user or if user in not authenticated
    if (!isAuth || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { emergencyType, location, victimMatNo, description, reporterMatNo } =
      await req.json();

    // Validate required fields to check if the user filled them or not
    if (!emergencyType || !location || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get victim's medical information if available
    const victimUser = await prisma.user.findFirst({
      where: { email: victimMatNo },
      include: { medicalInfo: true },
    });

    // Create emergency report
    const emergency = await prisma.emergency.create({
      data: {
        emergencyType,
        location,
        description,
        reporterMatNo: reporterMatNo || user.email,
        victimMatNo: victimMatNo || user.email,
        status: "active",
        medicalInfoId: victimUser?.medicalInfo?.id,
      },
    });

    // TODO: Send notification to clinic staff
    revalidatePath("/dashboard");
    return NextResponse.json({ success: true, emergency }, { status: 201 });
  } catch (error) {
    console.error("Error creating emergency report:", error);
    return NextResponse.json(
      { error: "Failed to create emergency report" },
      { status: 500 }
    );
  }
}
