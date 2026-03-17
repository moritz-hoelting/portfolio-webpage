import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    safelist: [
        "font-departure"
    ],
    theme: {
        extend: {
            fontFamily: {
                mono: ['"FiraCode"', ...defaultTheme.fontFamily.mono],
                departure: ['"DepartureMono"', ...defaultTheme.fontFamily.mono],
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: "full",
                    },
                },
            },
            rotate: {
                45: "45deg",
                135: "135deg",
                225: "225deg",
                315: "315deg",
            },
        },
    },
    plugins: [typography],
};
