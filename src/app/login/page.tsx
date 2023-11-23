"use client"

import { useAuth } from "@/hooks/useAuth"
import { ILogin } from "@/interfaces/auth.interfaces"
import { isValidEmail } from "@/utils/stringValidators"
import {
	Button,
	Flex,
	Input,
	Text,
	FormControl,
	FormLabel,
	ScaleFade,
	FormErrorMessage,
} from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

const LoginPage = () => {
	const router = useRouter()

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const { login, isLoading } = useAuth()

	const handleLogin: SubmitHandler<ILogin> = async (data, event) => {
		if (event) event.preventDefault()

		await login({ email: data.email, password: data.password })
	}

	return (
		<Flex
			bgImage="/background_3.png"
			bgSize="50%"
			minH="100vh"
			minW="100vw"
			justify="center"
			align="center"
		>
			<ScaleFade in>
				<Flex
					bgColor="white"
					borderRadius="15px"
					padding="20px"
					boxShadow="0px 5px 16px 5px rgba(0,0,0,0.5)"
					flexDir="column"
					minWidth={{ base: "100%", md: "500px" }}
				>
					<Text fontSize="30px" fontWeight="bold" mb="15px">
						Login
					</Text>

					<form onSubmit={handleSubmit(handleLogin)}>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<FormControl
									marginBottom={5}
									isInvalid={!!errors.email}
								>
									<FormLabel>Email</FormLabel>
									<Input
										{...field}
										{...register("email", {
											required: "Email is required.",
											validate: (value) =>
												isValidEmail(value) || "Invalid email.",
										})}
										placeholder="Email"
									/>
									<FormErrorMessage>
										{errors.email?.message}
									</FormErrorMessage>
								</FormControl>
							)}
						/>

						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<FormControl my="15px" isInvalid={!!errors.password}>
									<FormLabel>Password</FormLabel>
									<Input
										{...field}
										{...register("password", {
											required: "Password is required.",
											validate: () => "Invalid password.",
										})}
										placeholder="Password"
									/>
									<FormErrorMessage>
										{errors.password?.message}
									</FormErrorMessage>
								</FormControl>
							)}
						/>

						<Button
							w="100%"
							isLoading={isLoading}
							type="submit"
							marginTop="5px"
						>
							<Text>Login</Text>
						</Button>
					</form>

					<Button
						onClick={() => {
							router.push("/create-account")
						}}
						disabled={isLoading}
						variant="underline"
						mt="5px"
					>
						<Text>Create account</Text>
					</Button>
				</Flex>
			</ScaleFade>
		</Flex>
	)
}

export default LoginPage
