import { api } from "./api";

interface ILoginRequest {
    email: string;
    password: string;
}

interface ICreateUserRequest extends ILoginRequest {
    first_name: string;
    last_name: string;
}

const USER = "USER";

const userServices = api
    .enhanceEndpoints({
        addTagTypes: [USER],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            login: build.mutation<any, ILoginRequest>({
                query: ({ email, password }: ILoginRequest) => ({
                    url: "/v1/login",
                    method: "POST",
                    body: { email, password },
                }),
            }),
            logout: build.mutation<any, any>({
                query: () => ({
                    url: "/v1/logout",
                    method: "POST",
                }),
            }),
            createUser: build.mutation<any, ICreateUserRequest>({
                query: ({
                    email,
                    password,
                    first_name,
                    last_name,
                }: ICreateUserRequest) => ({
                    url: "/v1/create-account",
                    method: "POST",
                    body: { email, password, first_name, last_name },
                }),
            }),
        }),
        overrideExisting: false,
    });

export const { useLoginMutation, useLogoutMutation, useCreateUserMutation } =
    userServices;
