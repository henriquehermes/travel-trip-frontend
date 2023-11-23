"use client"

import React, {
	type PropsWithChildren,
	useEffect,
	useState,
	useCallback,
} from "react"

import { useAuth } from "@/hooks/useAuth"
import { CircularProgress, Flex, Image } from "@chakra-ui/react"
import { usePathname, useRouter } from "next/navigation"

export const ProtectRoute = (props: PropsWithChildren): JSX.Element => {
	const pathname = usePathname()
	const router = useRouter()

	const [isLoading, setIsLoading] = useState(true)

	const { logout } = useAuth()

	const hasUserObject = useCallback(async () => {
		setIsLoading(true)
		if (typeof localStorage !== "undefined") {
			const userObject = localStorage.getItem("userObject")

			if (
				(userObject && pathname.startsWith("/login")) ||
				pathname.startsWith("/create-account")
			) {
				return router.replace("/")
			}

			if (!userObject && !pathname.startsWith("/create-account")) {
				void logout()
			}
		}
		setIsLoading(false)
	}, [logout, pathname])

	useEffect(() => {
		void hasUserObject()
	}, [hasUserObject])

	if (
		!pathname.startsWith("/login") &&
		!pathname.startsWith("/create-account") &&
		isLoading
	) {
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
		)
	}

	return <>{props.children}</>
}
