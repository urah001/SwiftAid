import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { isClinicStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";

const BYPASS_AUTH_FOR_TESTING = true;

export async function GET() {
  try {
    if (!BYPASS_AUTH_FOR_TESTING) {
      const { getUser, isAuthenticated } = getKindeServerSession();
      const user = await getUser();
      const isAuth = await isAuthenticated();

      if (!isAuth || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const isClinic = await isClinicStaff(user.id);
      if (!isClinic) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    // Fetch all emergencies
    const emergencies = await prisma.emergency.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Attach medical info from victimMatNo -> User -> MedicalInfo
    const enrichedEmergencies = await Promise.all(
      emergencies.map(async (e) => {
        try {
          if (!e.victimMatNo) return { ...e, medicalInfo: null };

          const user = await prisma.user.findFirst({
            where: { matNo: e.victimMatNo || undefined },
            include: { medicalInfo: true },
          });
          console.log(user)

          return {
            ...e,
            medicalInfo: user?.medicalInfo,
          };
        } catch (err) {
          console.error(`Failed to get medical info for ${e.victimMatNo}:`, err);
          return { ...e, medicalInfo: null };
        }
      })
    );

     

    const active = enrichedEmergencies.filter((e) => e.status === "active");
    const resolved = enrichedEmergencies.filter((e) => e.status === "resolved");

    return NextResponse.json({ active, resolved });
  } catch (err) {
    console.error("Failed to fetch emergencies:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
