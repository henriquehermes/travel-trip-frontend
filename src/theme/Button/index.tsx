import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

const underline = defineStyle({
	textDecor: "underline",
	fontWeight: "semibold", // change the font weight
})

const primary = defineStyle({
	fontWeight: "semibold", // change the font weight
	backgroundColor: "#5C3BFE",
	color: "#FFFFFF",
	_hover: {
		background: "rgb(71, 34, 254)",
	},
})

export const buttonTheme = defineStyleConfig({
	variants: { primary, underline },
	defaultProps: {
		variant: "primary",
	},
})
