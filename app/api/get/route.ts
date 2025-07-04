// app/api/emergency/all/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.emergency.findMany({
    include: {
      medicalInfo: true, // include related medicalInfo data
    },
  });

  return NextResponse.json(data);
}
