import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { handleApiError } from "@/utils/apiError";
import { type IErrorApi } from "@/services/api";
import { useCreateUserMutation } from "@/services/user.service";
import { type IUser, type ICreateUser } from "@/interfaces/user.interfaces";
import { showToast, TOAST_TYPE } from "@/utils/toast";

export const useUser = () => {
    const [user, setUser] = useState<IUser>();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [createUserTrigger] = useCreateUserMutation();

    const createAccount = useCallback(
        async ({
            email,
            password,
            confirm_password,
            first_name,
            last_name,
        }: ICreateUser) => {
            try {
                setIsLoading(true);

                if (password !== confirm_password) {
                    showToast("Invalid password", TOAST_TYPE.ERROR);
                    return;
                }

                const userObject = await createUserTrigger({
                    email,
                    password,
                    first_name,
                    last_name,
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
        [createUserTrigger, router],
    );

    const getUser = useCallback(() => {
        let userLocalStorage: IUser = {
            id: "",
            email: "",
            first_name: "",
            last_name: "",
            token: "",
            refresh_token: "",
            role: "",
        };

        if (typeof localStorage !== "undefined") {
            const from_localStorage = localStorage.travel_bug;
            if (from_localStorage) {
                userLocalStorage = JSON.parse(from_localStorage);

                setUser(userLocalStorage);
            }
        }

        return userLocalStorage;
    }, []);

    useEffect(() => {
        if (typeof localStorage !== "undefined") getUser();
    }, [getUser]);

    return {
        createAccount,
        isLoading,
        user,
    };
};
