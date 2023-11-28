import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
    field: {
        fontWeight: "500", // change the font weight
        backgroundColor: "#fff",
        height: "56px",
        fontSize: "14px",
        transition:
            "background-color 200ms ease, outline 200ms ease, color 200ms ease, box-shadow 200ms ease, -webkit-box-shadow 200ms ease",
        outline: "none",
        color: "#0d0c22",
        border: "1.5px solid #e7e7e9",
        borderRadius: "12px",
        _hover: {
            borderColor: "#565564",
        },
    },
});

const secondary = definePartsStyle({
    field: {
        fontWeight: "500", // change the font weight
        backgroundColor: "#f4f5fb",
        height: "48px",
        fontSize: "14px",
        border: "none",
        outline: "none",
        color: "#0d0c22",
        borderRadius: "9999px",
    },
});

export const selectTheme = defineMultiStyleConfig({
    baseStyle,
    variants: {
        secondary,
    },
});
