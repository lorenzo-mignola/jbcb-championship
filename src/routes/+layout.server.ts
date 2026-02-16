import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const publicRoutes = ['/login', '/error'];

  const isPublicRoute = publicRoutes.some(route => url.pathname.startsWith(route));

  if (!locals.user && !isPublicRoute) {
    redirect(303, '/login');
  }

  return {
    session: locals.session,
    user: locals.user,
  };
};
