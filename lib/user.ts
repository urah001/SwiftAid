// lib/user.ts
import { prisma } from './db';

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      email: true,
    },
  });

  console.log(user)
  return user;
};
