import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				"aurora-purple": "#3B1C6F",
				"aurora-blue": "#66B9F2",
				"aurora-darkblue": "#4E67B2",
				"aurora-lightorange": "#EC92A1",
				"aurora-orangina": "#D95C7F",
				"aurora-lightred": "#AA507A",
				"aurora-pride-red": "#E40303",
				"aurora-pride-orange": "#FF8C00",
				"aurora-pride-yellow": "#FFED00",
				"aurora-pride-green": "#008026",
				"aurora-pride-blue": "#004DFF",
				"aurora-pride-violet": "#750787",
				"aurora-trans-blue": "#5BCEFA",
				"aurora-trans-pink": "#F5A9B8",
				"aurora-trans-white": "#F5F5F5",
				"ublue-darkblue": "#252B4B",
				"ublue-lightblue": "#3650EC",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
				meteor: {
					"0%": {
						transform: "rotate(var(--angle)) translateX(0)",
						opacity: "1",
					},
					"70%": {
						opacity: "1",
					},
					"100%": {
						transform: "rotate(var(--angle)) translateX(-500px)",
						opacity: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				meteor: "meteor 5s linear infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animated")],
} satisfies Config;

export default config;
