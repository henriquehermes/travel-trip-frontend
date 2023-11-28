import {
    type IMarkerResponse,
    type IMarkerRequest,
} from "@/interfaces/marker.interfaces";
import { api } from "./api";

const MARKER = "MARKER";

const markerServices = api
    .enhanceEndpoints({
        addTagTypes: [MARKER],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            createNewMarker: build.mutation<IMarkerResponse, IMarkerRequest>({
                query: () => ({
                    url: "/v1/marker",
                    method: "POST",
                }),
            }),
        }),
        overrideExisting: false,
    });

export const { useCreateNewMarkerMutation } = markerServices;
