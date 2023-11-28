"use client";

import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";
import { handleApiError } from "@/utils/apiError";
import { api, type IErrorApi } from "@/services/api";
import { useLoginMutation } from "@/services/user.service";
import { type ILogin } from "@/interfaces/auth.interfaces";
import { useDispatch } from "react-redux";

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const dispatch = useDispatch();

    const [loginTrigger] = useLoginMutation();

    const login = useCallback(
        async ({ email, password }: ILogin) => {
            try {
                setIsLoading(true);

                const userObject = await loginTrigger({
                    email,
                    password,
                }).unwrap();

                typeof localStorage !== "undefined" &&
                    localStorage.setItem(
                        "travel_bug",
                        JSON.stringify(userObject),
                    );

                router.replace("/");
            } catch (error) {
                handleApiError(error as IErrorApi);
                typeof localStorage !== "undefined" &&
                    localStorage.removeItem("travel_bug");
            } finally {
                setIsLoading(false);
            }
        },
        [loginTrigger, router],
    );

    const logout = useCallback(async (): Promise<any> => {
        try {
            setIsLoading(true);

            dispatch(api.util.resetApiState());
            router.replace("/login");
        } catch (error) {
            handleApiError(error as IErrorApi);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, router]);

    return {
        login,
        logout,
        isLoading,
    };
};
