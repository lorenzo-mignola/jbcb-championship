<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { createCategory } from '$lib/db/methods';
  import { CATEGORY_NAME } from '$lib/utils/constants';
  import { athletes, resetAthletes } from './athletes';
  import Athletes from './athletes.svelte';
  import CategoryName from './category-name.svelte';
  import NewAthlete from './new-athlete.svelte';

  $: canCreate = () => {
    const categoryName = $page.url.searchParams.get(CATEGORY_NAME) ?? '';
    return categoryName.length > 0 && $athletes.length > 0;
  };

  function handleCreate() {
    const categoryName = $page.url.searchParams.get(CATEGORY_NAME);
    if (!categoryName) {
      return;
    }
    const idNewCategory = createCategory(categoryName, $athletes);
    resetAthletes();
    goto(`/category?id=${idNewCategory}`);
  }
</script>

<CategoryName />

<div class="my-7">
  <Athletes />
  <NewAthlete />
</div>

<button
  type="button"
  class="btn btn-xl variant-filled-secondary mx-auto w-full mt-10"
  disabled={!canCreate()}
  on:click={handleCreate}>Crea categoria</button
>
