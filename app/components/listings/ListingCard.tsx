'use client';

import React, { useCallback, useMemo } from 'react'
import {Listing, Reservation,User} from '@prisma/client';
import { useRouter } from 'next/navigation';
import useCountries from '@/app/hooks/useCountries';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';
import { safeListing, SafeReservation, SafeUser } from '@/app/types';

interface ListingCardProps {
    data : safeListing ;
    reservation? : SafeReservation;
    onAction? : (id: string) => void;
    disabled ? : boolean;
    actionLabel ? : string;
    actionId? : string;
    currentUser ? : SafeUser | null


}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId= "",
    currentUser
}) => {

    const router = useRouter();
    const { getByValue} = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e : React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if(disabled){
                return ;
            }
            onAction?.(actionId)
        },[onAction,disabled,actionId]);

    const price = useMemo( () => {
        if(reservation) {
            return reservation.totalPrice;
        }
        return data.price

    },[reservation,data.price]);

    const reservationDate = useMemo( () => {
        if(!reservation) {
            return null;
        }
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start,'pp')} - ${format(end,'pp')}`

    },[reservation]);

  return (
    
    <div 
       onClick={ () => router.push(`/listings/${data.id}`)}
      className='col-span-1 cursor-pointer group'>
        <div className='flex flex-col gap-2 w-full'>
            <div
             className='
               aspect-square
               w-full
               relative
               overflow-hidden
               rounded-xl
             '
            >
                <Image 
                  fill
                  alt='listing'
                  src={data.imageSrc}
                  className='
                    object-cover
                    h-full
                    w-full
                    group-hover: scale-120
                    transition
                  '
                />

                <div className='absolute top-3 right-3'>
                    <HeartButton 
                      listingId = {data.id}
                      currentUser = {currentUser}
                    />
                </div>
            </div>
            <div className='font-semibold text-lg'>
              {location?.region} , {location?.label}
            </div>
            <div className='font-light text-lg'>
              {reservationDate || data.category}
            </div>
            <div className='flex flex-row items-center gap-1'>
              <div className='font-semibold'>
                $ {price}
              </div>
              { !reservation &&(
                <div className='font-light'>night</div>
              ) }

            </div>
            {onAction && actionLabel && (
              <Button 
                disabled = {disabled}
                small
                label = {actionLabel}
                onClick = {handleCancel}
              />
            )}
        </div>
    </div>
  )

}

export default ListingCard