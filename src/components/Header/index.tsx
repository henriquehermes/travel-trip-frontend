"use client";

import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Show,
    Text,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import localFont from "next/font/local";
import { MenuHamburger } from "../MenuHamburger";
import { memo } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

const myFont = localFont({
    src: [
        {
            path: "../../theme/fonts/Billabong.ttf",
            weight: "400",
            style: "normal",
        },
    ],
});

const HeaderComponent = () => {
    const router = useRouter();
    const { user } = useUser();

    return (
        <Flex
            paddingX={{ base: "10px", md: "40px" }}
            paddingY={{ base: "10px", md: "20px" }}
            align="center"
            bgColor="#ffffff"
            zIndex={999}
            justifyContent={"space-between"}
            gap={2}
        >
            <Flex gap={5} align={"center"} w="full" flex={1}>
                <Show breakpoint="(max-width: 768px)">
                    <MenuHamburger />
                </Show>
                <Text
                    fontSize={{ base: "30px", md: "35px" }}
                    fontFamily={myFont.style.fontFamily}
                    color="#1f1f1f"
                >
                    travel bug
                </Text>
            </Flex>

            <Flex align={"center"} justify="flex-end" w="full" flex={1} gap={5}>
                <Show breakpoint="(min-width: 768px)">
                    <InputGroup
                        maxW={{ base: "100%", md: "300px" }}
                        variant="secondary"
                    >
                        <InputLeftElement>
                            <FiSearch />
                        </InputLeftElement>
                        <Input placeholder="find location" />
                    </InputGroup>
                </Show>

                {!user?.id ? (
                    <Flex gap={5} align={"center"}>
                        <Show breakpoint="(min-width: 768px)">
                            <Button
                                onClick={() => {
                                    router.push("/login");
                                }}
                                variant="secondary"
                            >
                                <Text>Log in</Text>
                            </Button>
                        </Show>

                        <Button
                            onClick={() => {
                                router.push("/create-account");
                            }}
                        >
                            <Text>Sign Up</Text>
                        </Button>
                    </Flex>
                ) : (
                    <Flex gap={5} align={"center"}>
                        <Button>
                            <Text>Hello, {user.first_name}</Text>
                        </Button>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default memo(HeaderComponent);
