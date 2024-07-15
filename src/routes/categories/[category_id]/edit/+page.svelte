<script lang="ts" strictEvents>
  import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
  import axios from 'axios';
  import { onDestroy } from 'svelte';

  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import CategoryEdit from '$lib/components/new/category-edit.svelte';
  import { athletes } from '$lib/store/$athletes';
  import { categoryName } from '$lib/store/$category-name';
  import { duration } from '$lib/store/$duration';
  import { tournament } from '$lib/store/$tournament';
  import { type } from '$lib/store/$type';

  import { categoriesNotStarted } from '../../../../lib/store/$categories-not-started';
  import { initializeCategory } from './initialize-category';
  import { reset } from './reset';

  export let data;

  $: category = data.category;
  $: notStartedCategoriesData = data.notStartedCategories;

  $: initializeCategory(category);
  $: categoriesNotStarted.set(notStartedCategoriesData);

  const toastStore = getToastStore();
  const errorToast: ToastSettings = {
    message: 'Errore durante il salvataggio delle modifiche',
    background: 'variant-filled-error'
  };

  async function handleEdit() {
    if (!$categoryName || !$type || !category) {
      return;
    }

    try {
      const { data: idNewCategory } = await axios.patch<string>(`/api/categories/${category.id}`, {
        name: $categoryName.trim(),
        athletes: $athletes,
        type: $type,
        duration: $duration,
        tournament: $tournament
      });

      reset();
      goto(`${base}/categories/${idNewCategory}`);
    } catch (error) {
      toastStore.trigger(errorToast);
      // eslint-disable-next-line no-console -- console error
      console.error((error as { data: any }).data);
    }
  }

  onDestroy(() => {
    reset();
  });
</script>

<CategoryEdit handleClick={handleEdit}>
  <span slot="label-button">Modifica categoria</span>
</CategoryEdit>
