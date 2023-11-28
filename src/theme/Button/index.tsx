import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const underline = defineStyle({
    textDecor: "underline",
    fontWeight: "semibold", // change the font weight
});

const primary = defineStyle({
    fontWeight: "600", // change the font weight
    backgroundColor: "#0d0c22",
    borderRadius: "9999px",
    padding: "0px 30px",
    height: "48px",
    fontSize: "14px",
    color: "#fff",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.06)",
    _hover: {},
});

const secondary = defineStyle({
    fontWeight: "600", // change the font weight
    backgroundColor: "#fff",
    borderRadius: "9999px",
    padding: "0px 30px",
    height: "48px",
    fontSize: "14px",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.06)",
    color: "#0d0c22",
    _hover: {
        border: "1px solid #0d0c22",
    },
});

const tag = defineStyle({
    fontWeight: "600", // change the font weight
    backgroundColor: "#fff",
    height: "auto",
    borderRadius: "9999px",
    padding: "8px 10px",
    fontSize: "12px",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.06)",
    color: "#030303",
    _hover: {
        backgroundColor: "rgba(241,104,77,1)",
        color: "#fff",
        fontWeight: "bold",
    },
});

const radio = defineStyle({
    width: "30px",
    height: "30px",
    backgroundColor: "#F7F7FC",
    padding: "0px 0px",
    fontSize: 0,
    borderRadius: 999, // change the border radius of the control
    border: "2px solid #D8D8DF",
    minWidth: 30,
    boxShadow: "0px 8px 20px rgba(0,0,0,0.06)",
    _hover: {
        transform: "scale(1.1)",
    },
});

export const buttonTheme = defineStyleConfig({
    variants: { primary, underline, secondary, tag, radio },
    defaultProps: {
        variant: "primary",
    },
});
