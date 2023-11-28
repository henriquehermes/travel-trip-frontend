"use client";

import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
    Show,
    Text,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { memo } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import Hamburger from "hamburger-react";
import { useAuth } from "@/hooks/useAuth";

const HeaderComponent = () => {
    const router = useRouter();

    const { logout } = useAuth();
    const { user } = useUser();

    return (
        <Flex
            pos="absolute"
            w="100vw"
            left={0}
            right={0}
            paddingX={{ base: "10px", md: "40px" }}
            paddingY={{ base: "10px", md: "20px" }}
            align="center"
            zIndex={99999}
            justifyContent={"space-between"}
            gap={2}
        >
            <Flex align={"center"}>
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton bgColor="#fff" borderRadius="15px">
                                <Hamburger toggled={isOpen} size={20} />
                            </MenuButton>
                            <MenuList>
                                <MenuGroup title="Profile">
                                    <MenuItem>My Account</MenuItem>
                                </MenuGroup>
                                <MenuDivider />
                                <MenuGroup>
                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </>
                    )}
                </Menu>
            </Flex>

            <Flex align={"center"} justify="flex-end" w="full" flex={1} gap={5}>
                <Show breakpoint="(min-width: 768px)">
                    <InputGroup maxW={{ base: "100%", md: "300px" }}>
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
