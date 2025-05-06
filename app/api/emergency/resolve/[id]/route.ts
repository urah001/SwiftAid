import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { isClinicStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function PUT(req: Request) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();
    const isAuth = await isAuthenticated();

    if (!isAuth || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is clinic staff (optional - re-enable if needed)
    // const isClinic = await isClinicStaff(user.id);
    const isClinic = true;

    if (!isClinic) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Extract emergency ID from the URL
    const url = new URL(req.url);
    const pathSegments = url.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1];

    if (!id) {
      return NextResponse.json(
        { error: "Invalid emergency ID" },
        { status: 400 }
      );
    }

    // Update emergency status to resolved
    const emergency = await prisma.emergency.update({
      where: { id },
      data: {
        status: "resolved",
        resolvedAt: new Date(),
        resolvedById: user.id,
      },
    });

    revalidatePath("/dashboard");
    return NextResponse.json({ success: true, emergency });
  } catch (error) {
    console.error("Error resolving emergency:", error);
    return NextResponse.json(
      { error: "Failed to resolve emergency" },
      { status: 500 }
    );
  }
}
