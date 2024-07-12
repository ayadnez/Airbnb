import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";


const TripsPage = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <EmptyState
              title="Unauthorized"
              subtitle="Please login"
            />
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id
    });

  //  console.log('reservation lenghth in trips is  : %d ', reservations.length)

    if(reservations.length === 0) {
        return (
            <EmptyState
              title="No trips found"
              subtitle="you haven't reserved any trips"
            />
        )
    }

    return (
        <TripsClient
          reservations= {reservations}
          currentUser = {currentUser}
        />
    )

}

export default TripsPage;