"use client"

import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"

import { useRouter } from "next/navigation"
import { handleApiError } from "@/utils/apiError"
import { api, IErrorApi } from "@/services/api"
import { useLoginMutation } from "@/services/user.service"
import { ILogin } from "@/interfaces/auth.interfaces"

export const useAuth = () => {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const [loginTrigger] = useLoginMutation()

	const dispatch = useDispatch()

	const login = useCallback(
		async ({ email, password }: ILogin) => {
			try {
				setIsLoading(true)

				const userObject = await loginTrigger({
					email,
					password,
				}).unwrap()

				typeof localStorage !== "undefined" &&
					localStorage.setItem("userObject", JSON.stringify(userObject))

				return router.replace("/")
			} catch (error) {
				handleApiError(error as IErrorApi)
				typeof localStorage !== "undefined" &&
					localStorage.removeItem("userObject")
			} finally {
				setIsLoading(false)
			}
		},
		[loginTrigger, router]
	)

	const logout = useCallback(async (): Promise<any> => {
		try {
			setIsLoading(true)
			typeof localStorage !== "undefined" &&
				localStorage.removeItem("userObject")
			sessionStorage.removeItem("userObject")

			dispatch(api.util.resetApiState())
			return router.replace("/login")
		} catch (error) {
			handleApiError(error as IErrorApi)
		} finally {
			setIsLoading(false)
		}
	}, [dispatch, router])

	return {
		login,
		logout,
		isLoading,
	}
}
