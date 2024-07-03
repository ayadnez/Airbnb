'use client';
import React, { useMemo } from 'react'
import { Reservation, Listing , User} from "@prisma/client";
import { categories } from '@/app/components/navbar/Categories';
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';

interface ListingClientProps {
    reservations : Reservation[];
    listing : Listing ;
    currentUser : User | null;


}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser
}) => {

    const category  = useMemo(() => {
        return categories.find((item) =>
        item.label === listing.category);
    },[listing.category])

  return (
    <Container>
        <div className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col gap-6'>
                <ListingHead 
                   title = {listing.title}
                   imageSrc = {listing.imageSrc}
                   locationValue = {listing.locationValue}
                   id = {listing.id}
                   currentUser = {currentUser}
                />
                <div className='
                   grid
                   grid-cols-1
                   md: grid-cols-7
                   md: gap-7
                   mt-6
                
                '>
                    <ListingInfo
                       user ={listing.user}
                       category = {category}
                       description = {listing.description}
                       roomCount = {listing.roomCount}
                       guestCount = {listing.roomCount}
                       bathroomCount = {listing.bathroomCount}
                       locationValue = {listing.locationValue}
                    />

                </div>

            </div> 
         </div> 
    </Container>
  )
}

export default ListingClient