// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages serves from alexhhn.github.io/haitek; Cloudflare Workers serves from the domain root.
const isGitHubPages = process.env.DEPLOY_TARGET === 'gh-pages';

// https://astro.build/config
export default defineConfig({
	site: isGitHubPages ? 'https://alexhhn.github.io' : 'https://haitek.no',
	base: isGitHubPages ? '/haitek' : undefined,
	build: {
		assets: 'assets',
	},
});
