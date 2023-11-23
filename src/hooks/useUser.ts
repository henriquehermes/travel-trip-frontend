"use client"

import { useCallback, useState } from "react"

import { useRouter } from "next/navigation"
import { handleApiError } from "@/utils/apiError"
import { IErrorApi } from "@/services/api"
import { useCreateUserMutation } from "@/services/user.service"
import { ICreateUser } from "@/interfaces/user.interfaces"
import { showToast, TOAST_TYPE } from "@/utils/toast"

export const useUser = () => {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const [createUserTrigger] = useCreateUserMutation()

	const createAccount = useCallback(
		async ({
			email,
			password,
			confirm_password,
			first_name,
			last_name,
		}: ICreateUser) => {
			try {
				setIsLoading(true)

				if (password !== confirm_password) {
					return showToast("Invalid password", TOAST_TYPE.ERROR)
				}

				const userObject = await createUserTrigger({
					email,
					password,
					first_name,
					last_name,
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
		[createUserTrigger, router]
	)

	return {
		createAccount,
		isLoading,
	}
}
