import { UserEssentials } from "../types";

import prisma from "../../../prisma/prisma";

export async function createUser(user: UserEssentials) {
  const newUser = await prisma.user.create({
    data: user,
  });

  return newUser;
}

export async function getUserByEmail(email: UserEssentials["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
