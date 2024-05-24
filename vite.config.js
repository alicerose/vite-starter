import { resolve } from 'path'
import { defineConfig } from 'vite'
import { ViteEjsPlugin } from "vite-plugin-ejs";
import * as path from "path";

const root = resolve(__dirname, 'src')

export default defineConfig({
    root: root,
    publicDir: '../public',

    build: {
        outDir: '../dist',
    },

    plugins: [
        ViteEjsPlugin(),
    ],

    resolve: {
        alias: {
            '@/' : path.join(__dirname, 'src')
        }
    }
})
