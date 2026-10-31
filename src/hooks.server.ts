import type { Handle } from '@sveltejs/kit';

import { building } from '$app/environment';
import { svelteKitHandler } from 'better-auth/svelte-kit';

import { auth } from '$lib/auth/auth.server';

import { isEmailAllowed } from './lib/db/allowed-account';

export const handle: Handle = async ({ event, resolve }) => {
  try {
    const session = await auth.api.getSession({
      headers: event.request.headers,
    });

    if (session) {
      event.locals.session = session.session;
      event.locals.user = session.user;
    }
  } catch {
    // Better-Auth database is unreachable (e.g. missing credentials in local dev)
  }

  // Protect API routes (except /api/auth/*)
  if (event.url.pathname.startsWith('/api/') && !event.url.pathname.startsWith('/api/auth/')) {
    let isAllowed = false;
    try {
      isAllowed = await isEmailAllowed(event.locals.user?.email || '');
    } catch {
      isAllowed = false;
    }

    if (!event.locals.user || !isAllowed) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 401,
      });
    }
  }

  return svelteKitHandler({ auth, building, event, resolve });
};
