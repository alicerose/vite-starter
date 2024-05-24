import { resolve } from 'path'
import { defineConfig } from 'vite'
import { ViteEjsPlugin } from "vite-plugin-ejs";
import * as path from "path";
import {globSync} from "glob";

const root = resolve(__dirname, 'src')

const htmlFiles = globSync('src/**/*.html')
    .reduce((acc, curr) => {
        const key = path.relative('src', curr).replace('.html', '')
        acc[key] = curr
        return acc
    }, {});

export default defineConfig({
    root: root,
    publicDir: '../public',

    build: {
        outDir: '../dist',

        rollupOptions: {
            input: htmlFiles
        }
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
