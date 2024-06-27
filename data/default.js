export default {
	base: {
		url: 'https://example.com',
		title: 'Website title placeholder.',
		description: 'Website common description placeholder.',
		gtm: '',
	},
	routes: {},
	pages: {
		index: {
			title: null,
			description: null,
			path: '/',
			meta: ['<link rel="canonical" href="https://example.com/hoge" />'],
		},
		sub: {
			title: 'Sub Page',
			description: 'Sub Description',
			path: '/sub/',
		},
	},
};
