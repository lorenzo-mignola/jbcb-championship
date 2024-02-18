<script lang="ts" strictEvents>
  import { goto } from '$app/navigation';
  import CategoryEdit from '$lib/components/new/category-edit.svelte';
  import { athletes } from '$lib/store/$athletes';
  import { categoryName } from '$lib/store/$category-name';
  import { duration } from '$lib/store/$duration';
  import { tournament } from '$lib/store/$tournament';
  import { type } from '$lib/store/$type';
  import axios from 'redaxios';
  import { onDestroy } from 'svelte';
  import { categoriesNotStarted } from '../../../../lib/store/$categories-not-started';
  import { initializeCategory } from './initialize-category';
  import { reset } from './reset';

  export let data;
  $: category = data.category;
  $: notStartedCategoriesData = data.notStartedCategories;

  $: initializeCategory(category);
  $: categoriesNotStarted.set(notStartedCategoriesData);

  async function handleEdit() {
    if (!$categoryName || !$type || !category) {
      return;
    }

    const { data: idNewCategory } = await axios.patch<string>(`/api/categories/${category.id}`, {
      name: $categoryName.trim(),
      athletes: $athletes,
      type: $type,
      duration: $duration,
      tournament: $tournament
    });

    reset();
    goto(`/categories/${idNewCategory}`);
  }

  onDestroy(() => {
    reset();
  });
</script>

<CategoryEdit handleClick={handleEdit}>
  <span slot="label-button">Modifica categoria</span>
</CategoryEdit>
