import { User } from "@prisma/client";

import { TSettingsFormSchema } from "../validations/settings-validations";

import prisma from "../prisma";

export async function updateSettingsByUserIdQuery(
  id: User["id"],
  settings: TSettingsFormSchema
) {
  const updatedSettings = await prisma.user.update({
    where: {
      id,
    },
    data: settings,
  });

  return updatedSettings;
}

export async function getSettingsByUserIdQuery(id: User["id"]) {
  const settings = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      dateOfBirth: true,
      bio: true,
      phone: true,
      address: true,
      city: true,
      zipCode: true,
    },
  });

  return settings;
}
