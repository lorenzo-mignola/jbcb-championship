import { client } from '../../lib/db/client.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  try {
    await client.db('admin').command({ ping: 1 });
  } catch (error) {
    console.log('ERROR');
  }
  return {};
};
