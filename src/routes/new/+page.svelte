<script lang="ts" strictEvents>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import CategoryEdit from '$lib/components/new/category-edit.svelte';
  import { athletes, resetAthletes } from '$lib/store/$athletes';
  import { duration } from '$lib/store/$duration';
  import { type } from '$lib/store/$type';
  import { CATEGORY_NAME } from '$lib/utils/constants';
  import axios from 'redaxios';
  import { tournament } from '../../lib/store/$tournament';

  async function handleCreate() {
    const categoryName = $page.url.searchParams.get(CATEGORY_NAME);
    if (!categoryName || !$type) {
      return;
    }

    const { data: newCategoryId } = await axios.post<string>('/api/categories', {
      name: categoryName,
      athletes: $athletes,
      type: $type,
      duration: $duration,
      tournament: $tournament
    });

    resetAthletes();
    goto(`/categories/${newCategoryId}`);
  }
</script>

<CategoryEdit handleClick={handleCreate}>
  <span slot="label-button">Crea categoria</span>
</CategoryEdit>
