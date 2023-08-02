import { Router, json } from 'itty-router';
import { handleIncoming } from './automation';

const router = Router({ base: '/api' });

router
.post('/incoming', async (req, env) => {
	try {
			// console.log('Incoming request received:', req);
			const fileMeta = await req.json();
			const result = await handleIncoming(env, fileMeta);
			// console.log('Result of parse_release_name:', result);
			return new Response(JSON.stringify(result), { status: 200, headers: { 'Content-Type': 'application/json' } });
		} catch (err) {
			console.error('Error processing incoming request:', err);
			return new Response(JSON.stringify({ message: 'Error processing incoming request' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
		}
})
// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
