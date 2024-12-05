import { User } from "@prisma/client";

export type UserEssentials = Pick<
  User,
  "email" | "hashedPassword" | "firstName" | "lastName"
>;

export type UserSettings = {
  firstName: User["firstName"];
  lastName: User["lastName"];
  email: User["email"];
  dateOfBirth: User["dateOfBirth"] | null;
  bio: User["bio"] | null;
  phone: User["phone"] | null;
  address: User["address"] | null;
  city: User["city"] | null;
  zipCode: User["zipCode"] | null;
} | null;
