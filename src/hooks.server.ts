import type { Handle } from '@sveltejs/kit';

import { building } from '$app/environment';
import { svelteKitHandler } from 'better-auth/svelte-kit';

import { auth } from '$lib/auth/auth';

export const handle: Handle = async ({ event, resolve }) => {
  const session = await auth.api.getSession({
    headers: event.request.headers,
  });

  if (session) {
    event.locals.session = session.session;
    event.locals.user = session.user;
  }

  // Protect API routes (except /api/auth/*)
  if (event.url.pathname.startsWith('/api/') && !event.url.pathname.startsWith('/api/auth/')) {
    if (!event.locals.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 401,
      });
    }
  }

  return svelteKitHandler({ auth, building, event, resolve });
};
