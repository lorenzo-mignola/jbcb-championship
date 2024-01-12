<script lang="ts" strictEvents>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import CategoryEdit from '$lib/components/new/category-edit.svelte';
  import { athletes, resetAthletes } from '$lib/store/$athletes';
  import { duration } from '$lib/store/$duration';
  import { tournament } from '$lib/store/$tournament';
  import { type } from '$lib/store/$type';
  import { CATEGORY_NAME } from '$lib/utils/constants';
  import axios from 'redaxios';
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

  async function handleEdit() {
    const categoryName = $page.url.searchParams.get(CATEGORY_NAME);
    if (!categoryName || !$type || !category) {
      return;
    }

    const { data: idNewCategory } = await axios.patch<string>(`/api/categories/${category.id}`, {
      name: categoryName,
      athletes: $athletes,
      type: $type,
      duration: $duration,
      tournament: $tournament
    });

    resetAthletes();
    goto(`/categories/${idNewCategory}`);
  }
</script>

<CategoryEdit handleClick={handleEdit}>
  <span slot="label-button">Modifica categoria</span>
</CategoryEdit>
