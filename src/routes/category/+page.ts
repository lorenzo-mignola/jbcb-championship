import type { PageLoad } from '../new/$types';

export const load: PageLoad = async ({ url }) => {
	const id = url.searchParams.get('id');

	return {
		id
	};
};
