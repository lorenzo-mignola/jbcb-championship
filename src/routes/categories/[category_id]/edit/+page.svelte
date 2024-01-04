<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import CategoryEdit from '$lib/components/new/category-edit.svelte';
  import { editCategory } from '$lib/db/methods';
  import { athletes, resetAthletes } from '$lib/store/$athletes';
  import { duration } from '$lib/store/$duration';
  import { type } from '$lib/store/$type';
  import { CATEGORY_NAME } from '$lib/utils/constants';
  import { onMount } from 'svelte';
  import { initializeCategory } from './initialize-category';

  export let data;
  const category = data.category;

  onMount(() => {
    if (!category) {
      return;
    }
    initializeCategory(category);
  });

  function handleEdit() {
    const categoryName = $page.url.searchParams.get(CATEGORY_NAME);
    if (!categoryName || !$type || !category) {
      return;
    }
    const idNewCategory = editCategory(category._id, {
      name: categoryName,
      athletes: $athletes,
      type: $type,
      duration: $duration
    });
    resetAthletes();
    goto(`/categories/${idNewCategory}`);
  }
</script>

<CategoryEdit handleClick={handleEdit}>
  <span slot="label-button">Modifica categoria</span>
</CategoryEdit>
