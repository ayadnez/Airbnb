'use client';

import { User} from '@prisma/client';

import React from 'react'
import { AiFillAlert, AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
  listingId : string;
  currentUser? : User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser
}) => {

  const hasfavorited = false;
  const toggleFavorite = () => {};
  return (
    <div
    onClick={toggleFavorite}
    className='
     relative 
     hover: opacity-80
     transition
     cursor-pointer
    '
    >
      <AiOutlineHeart
        size={28}
        className='
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        '
      />
      <AiFillAlert 
       size={24}
       className={
        hasfavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
       }
      />

    </div>
  )
}

export default HeartButton