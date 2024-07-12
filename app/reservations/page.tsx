import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";


const ReservationsPage = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <EmptyState
              title="Unauthorized"
              subtitle="please login"
            />
        )
    }

    const reservations = await getReservations({
        authorId : currentUser.id
    });
    
  //  console.log("reservation length is : %d ",reservations.length)

    if(reservations.length === 0) {
        return (
            <EmptyState
              title="No reservations found"
              subtitle="you haven't any reservations"
            />
        )
    }

    return (
        <ReservationsClient
          reservations={reservations}
          currentUser = {currentUser}
        />
    )


};

export default ReservationsPage;