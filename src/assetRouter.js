import { Router } from 'itty-router';
import data from './assets';

const router = Router({ base: '/static' });

// Define a route for handling static .js values
router.get('/:key.js', async (request) => {
  try {
    const { key } = request.params;

    const file = data[key];

    // If the file is not found, return a 404 response
    if (!file) {
      return new Response('File not found', { status: 404 });
    }

    // Return the JavaScript file
    return new Response(file, {
      headers: {
        'Content-Type': 'text/javascript',
      },
    });
  } catch (e) {
    // If an error occurs, return a 500 response
    return new Response('Internal Server Error', { status: 500 });
  }
});

// Handle all other routes with a 404 response
router.all('*', () => new Response('Not found', { status: 404 }));

export default router;