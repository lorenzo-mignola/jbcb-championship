import type { Handle } from '@sveltejs/kit/hooks';

import { redirect } from '@sveltejs/kit';
import { building } from '$app/env';
import { svelteKitHandler } from 'better-auth/svelte-kit';

import { auth } from '#lib/auth/auth.server';

import { isEmailAllowed } from './lib/db/allowed-account';

const publicRoutes = [
  '/login',
  '/error',
  '/view',
  '/api/auth',
];

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

  const isPublicRoute = publicRoutes.some(route =>
    event.url.pathname.startsWith(route),
  );

  if (event.locals.user?.email) {
    try {
      event.locals.isAllowed = await isEmailAllowed(event.locals.user.email);
    } catch {
      event.locals.isAllowed = false;
    }
  } else {
    event.locals.isAllowed = false;
  }

  // Protect API routes (except /api/auth/*) and Remote Functions
  const isApiRoute
    = event.url.pathname.startsWith('/api/')
      && !event.url.pathname.startsWith('/api/auth/');
  const isRemoteFunction = event.isRemoteRequest;

  if (isApiRoute || isRemoteFunction) {
    if (!event.locals.user || !event.locals.isAllowed) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 401,
      });
    }
  } else if (!isPublicRoute) {
    if (!event.locals.user) {
      redirect(303, '/login');
    }

    if (!event.locals.isAllowed) {
      const params = new URLSearchParams({
        message: 'Diritti insufficienti per accedere a questa pagina',
        title: 'Accesso negato',
      });
      redirect(303, `/error?${params.toString()}`);
    }
  }

  return svelteKitHandler({ auth, building, event, resolve });
};
