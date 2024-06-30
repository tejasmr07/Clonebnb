import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeUser, safeLisitings } from "../types";

interface FavouritesClientProps {
  listings: safeLisitings[];
  currentUser?: SafeUser | null;
}

const FavouritesClient: React.FC<FavouritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you have Favorited" />
      <div
        className="
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listings) => (
          <ListingCard
            currentUser={currentUser}
            key={listings.id}
            data={listings}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavouritesClient;
