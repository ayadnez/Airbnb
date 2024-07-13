import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";

import prisam from "@/app/libs/prismadb";


interface IParams {
    listingId ? : string;
}
export async function DELETE(
    request : Request,
    { params } : { params : IParams}
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const { listingId } =  params;

    if(!listingId || typeof listingId !== 'string'){
        throw new Error("invalid id")
    }

    const listing = await prisam.listing.deleteMany({
        where : {
            id : listingId,
            userId : currentUser.id
        }
    });

    return NextResponse.json(listing);
}