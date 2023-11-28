"use client";

import { useAuth } from "@/hooks/useAuth";
import { type ILogin } from "@/interfaces/auth.interfaces";
import { isValidEmail } from "@/utils/stringValidators";
import {
    Button,
    Flex,
    Input,
    Text,
    FormControl,
    FormLabel,
    ScaleFade,
    FormErrorMessage,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

const LoginPage = () => {
    const router = useRouter();

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
    });

    const { login, isLoading } = useAuth();

    const handleLogin: SubmitHandler<ILogin> = async (data, event) => {
        if (event) event.preventDefault();

        await login({ email: data.email, password: data.password });
    };

    return (
        <Flex
            bgImage="/bgimage.jpg"
            bgPos="bottom"
            bgRepeat="no-repeat"
            minH="100vh"
            minW="100vw"
            justify={{ base: "center", md: "flex-end" }}
            align="center"
        >
            <Flex
                display={{ base: "none", md: "flex" }}
                padding="50px"
                h="100vh"
                w="100%"
                justify="flex-start"
                align="center"
            >
                <Text
                    lineHeight={"110px"}
                    color="white"
                    fontSize="100px"
                    fontWeight="bold"
                    textShadow="0 0 10px rgba(0,0,0,0.5)"
                >
                    Unlock
                    <br />
                    Your
                    <br />
                    Journey
                    <br />
                    Travel Bug
                </Text>
            </Flex>

            <Flex
                maxW={{ base: "100%", md: "600px" }}
                w={{ base: "90%", md: "50vw" }}
                h={{ base: "100%", md: "100vh" }}
                borderRadius={{ base: "15px", md: 0 }}
                bgColor="#fff"
                padding={{ base: "20px 30px", md: "50px" }}
                boxShadow="0px 5px 16px 5px rgba(0,0,0,0.5)"
                flexDir="column"
                justify="center"
            >
                <ScaleFade in>
                    <Text fontSize="40px" fontWeight="bold" mb="30px">
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
                                                isValidEmail(value) ||
                                                "Invalid email.",
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
                                <FormControl
                                    my="15px"
                                    isInvalid={!!errors.password}
                                >
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        {...field}
                                        {...register("password", {
                                            required: "Password is required.",
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
                        mt="10px"
                        w="full"
                        onClick={() => {
                            router.push("/create-account");
                        }}
                        disabled={isLoading}
                        variant="underline"
                    >
                        <Text>Create account</Text>
                    </Button>
                </ScaleFade>
            </Flex>
        </Flex>
    );
};

export default LoginPage;
