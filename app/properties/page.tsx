import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import getListing from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const properties = async () => {
  const curretUser = await getCurrentUser();

  if (!curretUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please 'login" />
      </ClientOnly>
    );
  }
  const listings = await getListing({
    userId: curretUser.id,
  });

  if (listings.length == 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Properties found"
          subtitle="Looks like you have any properties"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={curretUser} />
    </ClientOnly>
  );
};

export default properties;
