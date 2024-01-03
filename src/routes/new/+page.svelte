<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import CategoryEdit from '$lib/components/new/category-edit.svelte';
  import { createCategory } from '$lib/db/methods';
  import { duration } from '$lib/store/$duration';
  import { type } from '$lib/store/$type';
  import { CATEGORY_NAME } from '$lib/utils/constants';
  import { athletes, resetAthletes } from '../../lib/store/$athletes';

  function handleCreate() {
    const categoryName = $page.url.searchParams.get(CATEGORY_NAME);
    if (!categoryName || !$type) {
      return;
    }
    const idNewCategory = createCategory(categoryName, $athletes, $type, $duration);
    resetAthletes();
    goto(`/categories/${idNewCategory}`);
  }
</script>

<CategoryEdit handleClick={handleCreate}>
  <span slot="label-button">Crea categoria</span>
</CategoryEdit>
