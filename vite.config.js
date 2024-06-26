import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import * as path from 'node:path';
import { globSync } from 'glob';
import autoprefixer from 'autoprefixer';
import SiteConfig from './data/default.js';

const root = resolve(__dirname, 'src');

const htmlFiles = globSync('src/**/*.html').reduce((acc, curr) => {
	const key = path.relative('src', curr).replace('.html', '');
	acc[key] = curr;
	return acc;
}, {});

export default defineConfig(({ mode }) => {
	const envPrefix = ['VITE_', 'APP_ENV'];
	const env = loadEnv(mode, '.', envPrefix);
	console.log('Environments: ', { mode, env });

	return {
		root: root,
		publicDir: '../public',

		css: {
			postcss: {
				plugins: [autoprefixer],
			},
		},

		esbuild: {
			drop: env.APP_ENV === 'production' ? ['console', 'debugger'] : [],
		},

		build: {
			outDir: '../dist',
			emptyOutDir: true,

			rollupOptions: {
				input: htmlFiles,
				output: {
					assetFileNames: (assetInfo) => {
						let extType = assetInfo.name.split('.')[1];

						// WebFont
						if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
							extType = 'fonts';
						}

						// images
						if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
							extType = 'images';
						}

						// css
						if (extType === 'css') {
							return 'assets/css/[name].[hash].css';
						}

						return `assets/${extType}/[name][extname]`;
					},
					chunkFileNames: 'assets/js/[name].[hash].js',
					entryFileNames: 'assets/js/[name].[hash].js',
				},
			},
		},

		plugins: [
			ViteEjsPlugin(
				{
					config: {
						example: env.VITE_EXAMPLE_ENV_VAR ?? 'example',
						path: {
							root: {
								src: './',
								ejs: './ejs',
							},
							sub: {
								src: '../',
								ejs: './ejs',
							},
						},
						...SiteConfig,
					},
				},
				{
					ejs: (viteConfig) => ({
						beautify: true,
						watchEjsFiles: true,
						views: [`${root}`],
					}),
				},
			),
		],

		resolve: {
			alias: {
				'@/': `${root}/`,
			},
		},
	};
});
