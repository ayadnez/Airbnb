import prisma from "@/app/libs/prismadb";

export interface IListingParams {
    userId ? : string;
    guestCount ? : number;
    roomCount ? : number;
    bathroomCount ? : number;
    startDate ? : string;
    endDate ? : string;
    locationvalue ? : string;
    category ? : string
}

export default async function getListings (
    params : IListingParams
) {

    try {

        const {
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationvalue,
            category
        } = params ;

        let query : any  = {};
        if(userId) {
            query.userId = userId;
        }

        if(category) {
            query.category = category;
        }

        if(roomCount) {
            query.roomCount = {
                gte : +roomCount
            }
        }

        if(bathroomCount) {
            query.bathroomCount = {
                gte : +bathroomCount
            }
        }

        if(guestCount) {
            query.guestCount = {
                gte : +guestCount
            }
        }

        if(locationvalue) {
            query.locationvalue = locationvalue;
        }

        if(startDate && endDate) {
            query.NOT = {
                reservations : {
                    some :{
                        OR : [
                            {
                                endDate : {gte : startDate},
                                startDate : {lte: startDate},
                            },
                            {
                                startDate : { lte : endDate},
                                endDate : {gte : endDate},
                            }
                        ]
                    }
                }
            }
        }
        const listings = await prisma.listing.findMany({
            where : query,
            orderBy : {
                createdAt : 'desc'
            }
        });

        
        return listings;

    } catch (error : any) {
        throw new Error(error)

    }
}