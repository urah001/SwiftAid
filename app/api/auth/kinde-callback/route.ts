// app/api/auth/[...kindeAuth]/route.ts
import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { upsertUser } from "@/lib/auth";

export const GET = handleAuth({
  async signIn({ user }: any) {
    if (user) {
      await upsertUser({
        id: user.id,
        email: user.email ?? "",
        firstName: user.given_name,
        lastName: user.family_name,
      });
    }
    return true;
  },
});
