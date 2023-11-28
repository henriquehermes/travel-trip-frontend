import { extendTheme } from "@chakra-ui/react";
import localFont from "next/font/local";
import { buttonTheme } from "./Button";
import { inputTheme } from "./Input";
import { selectTheme } from "./Select";
import { switchTheme } from "./Switch";
import { checkboxTheme } from "./Checkbox";

const myFont = localFont({
    src: [
        {
            path: "./fonts/MonaSans-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "./fonts/MonaSans-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "./fonts/MonaSans-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "./fonts/MonaSans-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "./fonts/MonaSans-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
        {
            path: "./fonts/MonaSans-Black.ttf",
            weight: "900",
            style: "normal",
        },
    ],
});

const theme = extendTheme({
    fonts: {
        root: myFont.style.fontFamily,
        body: myFont.style.fontFamily,
        heading: myFont.style.fontFamily,
        table: myFont.style.fontFamily,
    },
    components: {
        Button: buttonTheme,
        Input: inputTheme,
        Select: selectTheme,
        Switch: switchTheme,
        Checkbox: checkboxTheme,
    },
    colors: {
        black: "#0d0c22",
        black_2: "#030303",
        teal_green: "#028476",
        forest_green: "#015D53",
        lime_green: "#6ECB5A",
        blue_1: "#5C3BFE",
        brow: "#4A4453",
        grey: "#AFA8BA",
        red_1: "#E50000",
        red2: "#FF0026",
        white: "#f1f2f4",
        orange_1: "rgba(241,104,77,1)",
    },
});

export default theme;
