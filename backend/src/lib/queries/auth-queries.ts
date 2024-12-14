import { UserEssentials } from "../types";

import prisma from "../prisma";

export async function createUserQuery(user: UserEssentials) {
  const newUser = await prisma.user.create({
    data: user,
  });

  return newUser;
}

export async function getUserByEmailQuery(email: UserEssentials["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
