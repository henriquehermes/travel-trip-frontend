import { type IAmenity } from "@/interfaces/amenity.interfaces";
import { api } from "./api";

const AMENITY = "AMENITY";

const amenityServices = api
    .enhanceEndpoints({
        addTagTypes: [AMENITY],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getListOfAmenities: build.query<IAmenity[], void>({
                query: () => ({
                    url: "/v1/amenities",
                    method: "GET",
                }),
            }),
        }),
        overrideExisting: false,
    });

export const { useGetListOfAmenitiesQuery } = amenityServices;
