import { redirect } from '@sveltejs/kit';

import { isEmailAllowed } from '$lib/db/allowed-account';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const publicRoutes = ['/login', '/error'];

  const isPublicRoute = publicRoutes.some(route => url.pathname.startsWith(route));

  if (isPublicRoute) {
    return {};
  }

  if (!locals.user) {
    redirect(303, '/login');
  }

  const isAllowed = await isEmailAllowed(locals.user?.email || '');

  if (!isAllowed) {
    const params = {
      message: 'Diritti insufficienti per accedere a questa pagina',
      title: 'Accesso negato',
    };

    const queryString = new URLSearchParams(params).toString();
    redirect(303, `/error?${queryString}`);
  }

  return {
    session: locals.session,
    user: locals.user,
  };
};
