<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import CategoryEdit from '$lib/components/new/category-edit.svelte';
  import { athletes, resetAthletes } from '$lib/store/$athletes';
  import { duration } from '$lib/store/$duration';
  import { type } from '$lib/store/$type';
  import { CATEGORY_NAME } from '$lib/utils/constants';

  async function handleCreate() {
    const categoryName = $page.url.searchParams.get(CATEGORY_NAME);
    if (!categoryName || !$type) {
      return;
    }

    const res = await fetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify({
        name: categoryName,
        athletes: $athletes,
        type: $type,
        duration: $duration
      })
    });
    const newCategoryId = await res.json();

    resetAthletes();
    goto(`/categories/${newCategoryId}`);
  }
</script>

<CategoryEdit handleClick={handleCreate}>
  <span slot="label-button">Crea categoria</span>
</CategoryEdit>
