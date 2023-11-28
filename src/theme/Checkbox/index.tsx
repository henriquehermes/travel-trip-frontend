import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

/* eslint-disable @typescript-eslint/unbound-method */
const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
    // define the part you're going to style
    label: {
        fontWeight: "semibold",
        fontSize: 16,
    },
    control: {
        width: 25,
        height: 25,
        backgroundColor: "#F7F7FC",
        padding: 2, // change the padding of the control
        borderRadius: 9999, // change the border radius of the control
        _checked: {
            bgColor: "#6ECB5A",
            borderColor: "#6ECB5A",
            _hover: {
                bgColor: "#6ECB5A",
                borderColor: "#6ECB5A",
            },
        },
    },
});

const secondary = definePartsStyle({
    control: defineStyle({
        borderColor: "#A9B1BF",
        borderWidth: "1px",
        borderRadius: "5px",

        _checked: {
            bgColor: "#6FB1C8",
            borderColor: "#6FB1C8",
            _hover: {
                bgColor: "#6FB1C8",
                borderColor: "#6FB1C8",
            },
        },
    }),
    container: defineStyle({
        border: "1px solid #D8D8DF",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        padding: "8px 10px",
    }),
    label: defineStyle({
        fontWeight: "semibold",
        fontSize: 14,
        color: "#091F40",
    }),
});

const outline = definePartsStyle({
    control: defineStyle({
        borderColor: "#A9B1BF",
        borderWidth: "1px",
        borderRadius: "5px",

        _checked: {
            bgColor: "#6FB1C8",
            borderColor: "#6FB1C8",
            _hover: {
                bgColor: "#6FB1C8",
                borderColor: "#6FB1C8",
            },
        },
    }),
    container: defineStyle({
        border: "1px solid #D8D8DF",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        padding: "8px 10px",
    }),
    label: defineStyle({
        fontWeight: "semibold",
        fontSize: 14,
        color: "#091F40",
    }),
});

export const checkboxTheme = defineMultiStyleConfig({
    baseStyle,
    variants: { outline, secondary },
});
