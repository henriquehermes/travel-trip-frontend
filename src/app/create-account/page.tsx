"use client"

import { useUser } from "@/hooks/useUser"
import { ICreateUser } from "@/interfaces/user.interfaces"
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

const CreateAccountPage = () => {
	const router = useRouter()
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			first_name: "",
			last_name: "",
			password: "",
			confirm_password: "",
		},
	})

	const { createAccount, isLoading } = useUser()

	const handleCreateAccount: SubmitHandler<ICreateUser> = async (
		data,
		event
	) => {
		if (event) event.preventDefault()

		await createAccount(data)
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
						Create Account
					</Text>

					<form onSubmit={handleSubmit(handleCreateAccount)}>
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
									/>
									<FormErrorMessage>
										{errors.email?.message}
									</FormErrorMessage>
								</FormControl>
							)}
						/>

						<Controller
							name="first_name"
							control={control}
							render={({ field }) => (
								<FormControl
									marginBottom={5}
									isInvalid={!!errors.first_name}
								>
									<FormLabel>First Name</FormLabel>
									<Input
										{...field}
										{...register("first_name", {
											required: "First Name is required.",
										})}
									/>
									<FormErrorMessage>
										{errors.first_name?.message}
									</FormErrorMessage>
								</FormControl>
							)}
						/>

						<Controller
							name="last_name"
							control={control}
							render={({ field }) => (
								<FormControl
									marginBottom={5}
									isInvalid={!!errors.last_name}
								>
									<FormLabel>Last Name</FormLabel>
									<Input
										{...field}
										{...register("last_name", {
											required: "Last Name is required.",
										})}
									/>
									<FormErrorMessage>
										{errors.last_name?.message}
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
										type="password"
										{...field}
										{...register("password", {
											required: "Password is required.",
										})}
									/>
									<FormErrorMessage>
										{errors.password?.message}
									</FormErrorMessage>
								</FormControl>
							)}
						/>

						<Controller
							name="confirm_password"
							control={control}
							render={({ field }) => (
								<FormControl
									my="15px"
									isInvalid={!!errors.confirm_password}
								>
									<FormLabel>Confirm Password</FormLabel>
									<Input
										type="password"
										{...field}
										{...register("confirm_password", {
											required: "Confirm Password is required.",
										})}
									/>
									<FormErrorMessage>
										{errors.confirm_password?.message}
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
							<Text>Create</Text>
						</Button>
					</form>

					<Button
						onClick={() => {
							router.push("/login")
						}}
						disabled={isLoading}
						variant="underline"
						mt="5px"
					>
						<Text>Go Back</Text>
					</Button>
				</Flex>
			</ScaleFade>
		</Flex>
	)
}

export default CreateAccountPage
