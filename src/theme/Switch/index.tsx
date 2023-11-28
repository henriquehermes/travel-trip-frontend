/* eslint-disable @typescript-eslint/unbound-method */
import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
    // define the part you're going to style
    container: {
        // ...
    },
    thumb: {
        bg: "#fff",
    },
    track: {
        bg: "gray.300",
        _checked: {
            bg: "#89DC65",
        },
    },
});

export const switchTheme = defineMultiStyleConfig({ baseStyle });
