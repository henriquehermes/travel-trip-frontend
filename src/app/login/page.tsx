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
            bgImage={{ base: "/bgimage.jpg", md: "" }}
            bgPos="bottom"
            bgSize="cover"
            minH="100vh"
            minW="100vw"
            justify={{ base: "center", md: "flex-end" }}
            align="center"
        >
            <Flex
                bgImage="/bgimage.jpg"
                bgPos="bottom"
                bgSize="cover"
                flex={{ base: 0, md: 0.5, lg: 1 }}
                display={{ base: "none", md: "flex" }}
                padding={{ base: "30px", lg: "50px" }}
                w="100%"
                minH={{ base: "100%", md: "100vh" }}
                justify="flex-start"
                align="center"
                overflow="hidden"
            >
                <Text
                    lineHeight={"110px"}
                    color="white"
                    fontSize="100px"
                    fontWeight="bold"
                    textShadow="0 0 10px rgba(0,0,0,0.3)"
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
                flex={{ base: 1, md: 0.5, lg: 0.8 }}
                minH={{ base: "100%", md: "100vh" }}
                bgColor="#fff"
                mx={{ base: "20px", md: 0 }}
                borderRadius={{ base: "15px", md: 0 }}
                padding={{ base: "20px 30px", md: "50px" }}
                boxShadow="0px 5px 16px 5px rgba(0,0,0,0.5)"
                flexDir="column"
                justify="center"
            >
                <ScaleFade in>
                    <Flex
                        flexDir="column"
                        w="full"
                        maxW={{ base: "100%", md: "500px" }}
                    >
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
                                                required:
                                                    "Password is required.",
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
                    </Flex>
                </ScaleFade>
            </Flex>
        </Flex>
    );
};

export default LoginPage;
