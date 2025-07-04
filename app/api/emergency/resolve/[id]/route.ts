// api/user/medical-info/[matNo]/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { matNo: string } }
) {
  try {
    const user = await prisma.user.findFirst({
      where: { matNo: params.matNo },
      include: { medicalInfo: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.medicalInfo || null);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
