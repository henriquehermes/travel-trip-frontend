// app/providers.tsx
"use client"

import store from "@/store"
import theme from "@/theme"
import { ProtectRoute } from "@/utils/protectRoute"
import { CacheProvider } from "@chakra-ui/next-js"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<CacheProvider>
			<Provider store={store}>
				<ToastContainer />
				<ChakraProvider theme={theme}>
					<ProtectRoute>{children}</ProtectRoute>
				</ChakraProvider>
			</Provider>
		</CacheProvider>
	)
}
