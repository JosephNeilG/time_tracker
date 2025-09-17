/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all files that contain Nativewind classes.
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./screens/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: "#426E63",
				secondary: "#6B7580",
				light: {
					100: "#F3F4F6",
					200: "#9FA5B0",
					300: "#D2D5DE",
					400: "#F9FAFC",
				},
				dark: {
					100: "#414851",
					200: "#384152",
					300: "#D1D4DB",
					400: "#6C7281",
					500: "#111928",
					600: "#192031",
				},
				danger: "#F04543",
				warning: "#F17D35",
			},
		},
	},
	plugins: [],
};
