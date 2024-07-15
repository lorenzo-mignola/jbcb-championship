<script lang="ts" strictEvents>
  import { getDrawerStore } from '@skeletonlabs/skeleton';
  import axios from 'axios';

  import type { Match } from '$lib/types/match.type';

  import { resetNextMatches, setNextMatches } from '../../../store/$next-matches';

  const drawerStore = getDrawerStore();

  export let categoryId: string;

  async function openDrawer() {
    resetNextMatches();
    const { data } = await axios.get<Match[]>(`/api/categories/${categoryId}/nextMatches`);
    setNextMatches(data);
    drawerStore.open({ id: 'next-match' });
  }
</script>

<button
  class="variant-filled-surface btn btn-sm mt-2 w-full shadow-md"
  data-testId="drawer-next-matches"
  type="button"
  on:click={openDrawer}
>
  ⏭️ Prossimi incontri
</button>
