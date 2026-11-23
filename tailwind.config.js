/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: 'rgb(var(--bg-rgb) / <alpha-value>)',
                card: 'rgb(var(--card-rgb) / <alpha-value>)',
                ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
                mute: 'rgb(var(--mute-rgb) / <alpha-value>)',
                rule: 'rgb(var(--rule-rgb) / <alpha-value>)',
                acc: 'rgb(var(--acc-rgb) / <alpha-value>)',
                ok: 'rgb(var(--ok-rgb) / <alpha-value>)',
                term: 'rgb(var(--term-rgb) / <alpha-value>)'
            },
            fontFamily: {
                sans: ['Schibsted Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
            }
        }
    },
    plugins: [],
}
