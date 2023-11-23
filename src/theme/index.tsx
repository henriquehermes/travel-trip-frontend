import { extendTheme } from "@chakra-ui/react"
import { Inter } from "next/font/google"
import { buttonTheme } from "./Button"

const inter = Inter({ subsets: ["latin"], preload: true })

const theme = extendTheme({
	fonts: {
		root: inter.style.fontFamily,
		body: inter.style.fontFamily,
		heading: inter.style.fontFamily,
		table: inter.style.fontFamily,
	},
	components: {
		Button: buttonTheme,
	},
	colors: {
		blue: "#5C3BFE",
		brow: "#4A4453",
		grey: "#AFA8BA",
		red: "#E50000",
		red2: "#FF0026",
	},
})

export default theme
