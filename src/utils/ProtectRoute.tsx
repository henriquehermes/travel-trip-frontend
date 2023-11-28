"use client";

import React, {
    type PropsWithChildren,
    useEffect,
    useState,
    useCallback,
} from "react";

import { useAuth } from "@/hooks/useAuth";
import { CircularProgress, Flex } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";

export const ProtectRoute = (props: PropsWithChildren): JSX.Element => {
    const pathname = usePathname();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);

    const { logout } = useAuth();

    const hasUserObject = useCallback(async () => {
        if (typeof localStorage !== "undefined") {
            const userObject = localStorage.getItem("travel_bug");

            if (userObject) {
                if (
                    pathname.startsWith("/login") ||
                    pathname.startsWith("/create-account")
                ) {
                    setIsLoading(false);
                    router.replace("/");
                    return;
                } else {
                    setIsLoading(false);
                    return;
                }
            }

            if (!userObject && !pathname.startsWith("/create-account")) {
                void logout();
            }
        }
    }, [logout, pathname, router]);

    useEffect(() => {
        void hasUserObject();
    }, [hasUserObject]);

    if (
        pathname.startsWith("/login") ||
        pathname.startsWith("/create-account")
    ) {
        return <>{props.children}</>;
    }

    if (isLoading) {
        return (
            <Flex
                flexDir="column"
                w="100vw"
                h="100vh"
                justifyContent={"center"}
                alignItems={"center"}
            >
                <CircularProgress size="35px" color="#5C3BFE" isIndeterminate />
            </Flex>
        );
    }

    return <>{props.children}</>;
};
