import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import { Button, Flex, Text } from "@chakra-ui/react";

export const MenuHamburger = () => {
    const [isOpen, setOpen] = useState(false);
    const ref = useRef(null);

    return (
        <div ref={ref}>
            <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            padding: 5,
                            paddingTop: 0,
                            backgroundColor: "#fff",
                            zIndex: 99999,
                        }}
                    >
                        <ul>
                            <motion.li
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.1 + 1 / 10,
                                }}
                            >
                                <Button
                                    h="50px"
                                    variant="ghost"
                                    w="full"
                                    padding="0.08rem"
                                    onClick={() => {
                                        setOpen((prev) => !prev);
                                    }}
                                >
                                    <Text color="#030303">Log in</Text>
                                </Button>
                            </motion.li>
                        </ul>

                        <ul>
                            <motion.li
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.1 + 2 / 10,
                                }}
                            >
                                <Button
                                    h="50px"
                                    w="full"
                                    padding="0.08rem"
                                    variant="ghost"
                                    onClick={() => {
                                        setOpen((prev) => !prev);
                                    }}
                                >
                                    <Text color="#030303">Help</Text>
                                </Button>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
            {isOpen && (
                <Flex
                    onClick={() => {
                        setOpen(false);
                    }}
                    pos={"absolute"}
                    backgroundColor="rgba(0,0,0,0.7)"
                    w="100%"
                    h="100%"
                    left="0"
                    right="0"
                    backdropFilter="auto"
                    backdropBlur="2px"
                />
            )}
        </div>
    );
};
