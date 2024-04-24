import { resolve } from 'path'
import { defineConfig } from 'vite'
import { ViteEjsPlugin } from "vite-plugin-ejs";

const root = resolve(__dirname, 'src')

export default defineConfig({
    root: 'src',
    publicDir: '../public',

    build: {
        outDir: '../dist',

    },

    plugins: [
        ViteEjsPlugin(),
    ]
})
