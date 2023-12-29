<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import CategoryType from '$lib/components/new/type/category-type.svelte';
  import { createCategory } from '$lib/db/methods';
  import { type } from '$lib/store/$type';
  import { CATEGORY_NAME } from '$lib/utils/constants';
  import { athletes, resetAthletes } from '../../lib/store/$athletes';
  import Athletes from './athletes.svelte';
  import CategoryName from './category-name.svelte';
  import NewAthlete from './new-athlete.svelte';

  $: canCreate = () => {
    const categoryName = $page.url.searchParams.get(CATEGORY_NAME) ?? '';
    return [categoryName.length > 0, $athletes.length > 1, $type].every(Boolean);
  };

  function handleCreate() {
    const categoryName = $page.url.searchParams.get(CATEGORY_NAME);
    if (!categoryName || !$type) {
      return;
    }
    const idNewCategory = createCategory(categoryName, $athletes, $type);
    resetAthletes();
    goto(`/category/${idNewCategory}`);
  }
</script>

<CategoryName />

<div class="my-7">
  <Athletes />
  <NewAthlete />
  <CategoryType />
</div>

<button
  type="button"
  class="btn btn-xl variant-filled-secondary mx-auto w-full mt-10"
  disabled={!canCreate()}
  on:click={handleCreate}>Crea categoria</button
>
