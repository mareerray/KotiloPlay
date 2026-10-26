import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),

        VitePWA({
            registerType: "prompt",

            includeAssets: ["kotiloplay-apple-touch-icon.png"],

            manifest: {
                id: "/",
                name: "KotiloPlay",
                short_name: "KotiloPlay",
                description: "A cozy home for your music.",

                theme_color: "#f7e5c9",
                background_color: "#f7e5c9",

                display: "standalone",
                start_url: "/",
                scope: "/",

                icons: [
                    {
                        src: "/kotiloplay-icon-192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "/kotiloplay-icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "/kotiloplay-icon-maskable-512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },

            workbox: {
                globPatterns: [
                    "**/*.{js,css,html,svg,png,ico,webp,woff,woff2}",
                ],
                navigateFallback: "index.html",
            },
        }),
    ],
});