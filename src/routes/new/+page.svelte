<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import CategoryDuration from '$lib/components/new/type/category-duration.svelte';
  import CategoryType from '$lib/components/new/type/category-type.svelte';
  import { createCategory } from '$lib/db/methods';
  import { duration } from '$lib/store/$duration';
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
    const idNewCategory = createCategory(categoryName, $athletes, $type, $duration);
    resetAthletes();
    goto(`/category/${idNewCategory}`);
  }
</script>

<div class="flex flex-col gap-4">
  <CategoryName />
  <CategoryDuration />
  <CategoryType />
</div>

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
