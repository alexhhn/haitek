// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://alexhhn.github.io',
	base: '/haitek',
	build: {
		assets: 'assets',
	},
});
