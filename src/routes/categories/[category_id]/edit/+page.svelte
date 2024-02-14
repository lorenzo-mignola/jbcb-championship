<script lang="ts" strictEvents>
  import { goto } from '$app/navigation';
  import CategoryEdit from '$lib/components/new/category-edit.svelte';
  import { athletes, resetAthletes } from '$lib/store/$athletes';
  import { categoryName } from '$lib/store/$category-name';
  import { duration } from '$lib/store/$duration';
  import { tournament } from '$lib/store/$tournament';
  import { type } from '$lib/store/$type';
  import axios from 'redaxios';
  import { onDestroy, onMount } from 'svelte';
  import { categoriesNotStarted } from '../../../../lib/store/$categories-not-started';
  import { initializeCategory } from './initialize-category';

  export let data;
  const category = data.category;
  const notStartedCategoriesData = data.notStartedCategories;

  onMount(() => {
    if (!category) {
      return;
    }
    initializeCategory(category);
    categoriesNotStarted.set(notStartedCategoriesData);
  });

  const reset = () => {
    resetAthletes();
    categoryName.set('');
    categoriesNotStarted.set([]);
  };

  async function handleEdit() {
    if (!$categoryName || !$type || !category) {
      return;
    }

    const { data: idNewCategory } = await axios.patch<string>(`/api/categories/${category.id}`, {
      name: $categoryName,
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
