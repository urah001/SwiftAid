import { NextRequest, NextResponse } from "next/server";
import { upsertUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { id, email, role } = body;

  // Save the user to your DB
  const success = await upsertUser({
    id,
    email,
    role, // e.g. 'student' or 'clinic'
  });

  if (success) {
    return NextResponse.json({ message: "User registered successfully" });
  }

  return NextResponse.json({ error: "Registration failed" }, { status: 400 });
}
