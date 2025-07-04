import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { matNo: string } }
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        matNo: params.matNo,
      },
      include: {
        medicalInfo: true,
      },
    });

    if (!user || !user.medicalInfo) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(user.medicalInfo);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
