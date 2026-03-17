// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://Dan-Crawford.github.io',
	base: '/shaky-solstice',
	integrations: [
		starlight({
			title: 'My Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Dan-Crawford/shaky-solstice' }],
			sidebar: [
				{
					label: 'Posts',
					autogenerate: { directory: 'posts' },
				},
			],
		}),
	],
});
