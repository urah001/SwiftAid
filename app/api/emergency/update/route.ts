import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { allergies, condition, medication } = await req.json();

    // Check if medical info already exists
    const existingInfo = await prisma.medicalInfo.findUnique({
      where: { userId: user.id },
    });

    let updated;

    if (existingInfo) {
      // Update existing record
      updated = await prisma.medicalInfo.update({
        where: { userId: user.id },
        data: {
          allergies,
          conditions: condition,
          medications: medication,
        },
      });
    } else {
      // Create new record
      updated = await prisma.medicalInfo.create({
        data: {
          userId: user.id,
          allergies,
          conditions: condition,
          medications: medication,
        },
      });
    }

    return NextResponse.json({ message: "Medical info updated", data: updated });
  } catch (err) {
    console.error("Update failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
