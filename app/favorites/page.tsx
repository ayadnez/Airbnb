import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListing";

import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {

    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if(listings.length === 0) {
        return (
            <EmptyState 
              title="No favorites found"
              subtitle="you have no favorites listing"
            />
        )

    }

    return (
        <FavoritesClient 
          listings = {listings}
          currentUser = {currentUser}
        />
    )

   
}

export default ListingPage;

