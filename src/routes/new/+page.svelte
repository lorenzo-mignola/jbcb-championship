<script lang="ts" strictEvents>
  import axios from 'axios';

  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import CategoryEdit from '$lib/components/new/category-edit.svelte';
  import { athletes, resetAthletes } from '$lib/store/$athletes';
  import { categoryName } from '$lib/store/$category-name';
  import { duration } from '$lib/store/$duration';
  import { type } from '$lib/store/$type';

  import { tournament } from '../../lib/store/$tournament';

  const reset = () => {
    resetAthletes();
    categoryName.set('');
  };

  async function handleCreate() {
    if (!$categoryName || !$type) {
      return;
    }

    const { data: newCategoryId } = await axios.post<string>('/api/categories', {
      name: $categoryName.trim(),
      athletes: $athletes,
      type: $type,
      duration: $duration,
      tournament: $tournament
    });

    reset();
    goto(`${base}/categories/${newCategoryId}`);
  }
</script>

<CategoryEdit handleClick={handleCreate}>
  <span slot="label-button">Crea categoria</span>
</CategoryEdit>
