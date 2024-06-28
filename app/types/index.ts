import { Listing, Reservation, User } from "@prisma/client";

export type safeLisitings = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type safeReservations = Omit<
  Reservation,
  "createdAt" | "startDate" | " endDate" | "Listing"
> & {
  createAt: string;
  startDate: string;
  endDate: string;
  listing: safeLisitings;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
