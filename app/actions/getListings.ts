import prisma from "@/app/libs/prismadb";
export default async function getListing() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeLisitings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeLisitings;
  } catch (error: any) {
    throw new Error(error);
  }
}
