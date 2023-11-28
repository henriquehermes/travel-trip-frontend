import { type IUser } from "@/interfaces/user.interfaces";
import {
    type BaseQueryFn,
    type FetchArgs,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export interface IErrorApi {
    data: {
        error: string;
    };
    status: number;
}

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8008",
    prepareHeaders: async (headers) => {
        const userLocalStorage = localStorage.getItem("travel_bug");

        if (userLocalStorage) {
            const userObject: IUser = JSON.parse(userLocalStorage);
            headers.set("authorization", `Bearer ${userObject?.token}`);
        } else {
            headers.delete("authorization");
        }

        return headers;
    },
});

/**
 * Base API service to be used across the application.
 * Endpoints can be injected using the .injectEndpoints method.
 */
export const api = createApi({
    reducerPath: "apiReducer",
    baseQuery: baseQuery as BaseQueryFn<string | FetchArgs, unknown, IErrorApi>,
    endpoints: () => ({}),
});
