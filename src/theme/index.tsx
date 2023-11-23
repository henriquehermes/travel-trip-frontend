import { extendTheme } from "@chakra-ui/react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"], preload: true })

const theme = extendTheme({
	fonts: {
		root: inter.style.fontFamily,
		body: inter.style.fontFamily,
		heading: inter.style.fontFamily,
		table: inter.style.fontFamily,
	},
	components: {},
})

export default theme
