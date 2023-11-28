import { Flex, Text } from "@chakra-ui/react";

const StripedView = () => {
    return (
        <Flex
            backgroundImage="linear-gradient(45deg, #B2A2CD 11.11%, #5F5370 11.11%, #5F5370 50%, #B2A2CD 50%, #B2A2CD 61.11%, #5F5370 61.11%, #5F5370 100%)"
            backgroundSize="30px 30px"
            h="250px"
            width="300px"
            borderRadius="15px"
            pos="relative"
            justify="center"
            align="center"
        >
            <Flex
                bgColor="#fff"
                position="absolute"
                top="7px"
                left="7px"
                right="7px"
                bottom="7px"
                borderRadius="15px"
                padding="10px"
            >
                <Text>Testing</Text>
            </Flex>
        </Flex>
    );
};

export default StripedView;
