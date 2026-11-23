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
                bg: 'var(--bg)',
                card: 'var(--card)',
                ink: 'var(--ink)',
                mute: 'var(--mute)',
                rule: 'var(--rule)',
                acc: 'var(--acc)',
                ok: 'var(--ok)',
                term: 'var(--term)'
            },
            fontFamily: {
                sans: ['Schibsted Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
            }
        }
    },
    plugins: [],
}
