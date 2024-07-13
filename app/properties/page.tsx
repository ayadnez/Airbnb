import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";

import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";


const PropertiesPage = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <EmptyState
              title="Unauthorized"
              subtitle="Please login"
            />
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    });

  //  console.log('reservation lenghth in trips is  : %d ', reservations.length)

    if(listings.length === 0) {
        return (
            <EmptyState
              title="No properties found"
              subtitle="you haven't any properties here "
            />
        )
    }

    return (
        <PropertiesClient
          listings= {listings}
          currentUser = {currentUser}
        />
    )

}

export default PropertiesPage;