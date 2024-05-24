import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import * as path from 'node:path';
import { globSync } from 'glob';
import autoprefixer from 'autoprefixer';

const root = resolve(__dirname, 'src');

const htmlFiles = globSync('src/**/*.html').reduce((acc, curr) => {
	const key = path.relative('src', curr).replace('.html', '');
	acc[key] = curr;
	return acc;
}, {});

export default defineConfig({
	root: root,
	publicDir: '../public',

	css: {
		postcss: {
			plugins: [autoprefixer],
		},
	},

	build: {
		outDir: '../dist',
		emptyOutDir: true,

		rollupOptions: {
			input: htmlFiles,
		},
	},

	plugins: [
		ViteEjsPlugin(
			{
				config: {
					root: {
						path: {
							src: './',
							ejs: './ejs',
						},
					},
					sub: {
						path: {
							src: '../',
							ejs: './ejs',
						},
					},
				},
			},
			{
				ejs: {
					beautify: true,
				},
			},
		),
	],

	resolve: {
		alias: {
			'@/': `${root}/`,
		},
	},
});
