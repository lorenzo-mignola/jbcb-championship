import { createCategory } from '$lib/db/methods.server';
import type { Actions } from './$types';

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name')?.toString();
    const athletes = JSON.parse(data.get('athletes')?.toString() || '[]');
    const type = data.get('type')?.toString();
    const duration = Number(data.get('duration')?.toString());
    if (!name || !type) {
      return;
    }
    await createCategory({ name, athletes, type, duration });
    console.log('category created');
  }
} satisfies Actions;
