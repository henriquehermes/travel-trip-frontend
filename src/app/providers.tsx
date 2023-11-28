/* eslint-disable react/prop-types */
// app/providers.tsx
"use client";

import store from "@/redux/store";
import theme from "@/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({
    children,
    ...rest
}: {
    children: React.ReactNode;
}) {
    return (
        <CacheProvider>
            <Provider store={store}>
                <ToastContainer />
                <ChakraProvider theme={theme}>{children}</ChakraProvider>
            </Provider>
        </CacheProvider>
    );
}
