import type { NextRequest } from "next/server"
import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server"

import { upsertUser } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: Record<string, string> }) {
  const authRequest = handleAuth(request, {
    callbacks: {
      async signIn({ user }) {
        if (user) {
          // Create or update user in database
          await upsertUser({
            id: user.id,
            email: user.email || "",
            firstName: user.given_name,
            lastName: user.family_name,
          })
        }
        return true
      },
    },
  })

  return authRequest
}
