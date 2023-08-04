import apiRouter from './apiRouter';
import assetRouter from './assetRouter';

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if (url.pathname.startsWith('/api')) {
			return apiRouter.handle(request, env);
		}

		if (url.pathname.startsWith('/static')) {
			return assetRouter.handle(request, env);
		}

		return new Response(
			`Hello`,
			{ headers: { 'Content-Type': 'text/html' } }
		);
	},
};
