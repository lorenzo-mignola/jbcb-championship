<script>
  import { page } from '$app/stores';
  import CategoryEdit from '$lib/components/new/category-edit.svelte';
  import { athletes } from '$lib/store/$athletes';
  import { duration } from '$lib/store/$duration';
  import { type } from '$lib/store/$type';
  import { CATEGORY_NAME } from '$lib/utils/constants';

  function handleCreate() {
    const categoryName = $page.url.searchParams.get(CATEGORY_NAME);
    if (!categoryName || !$type) {
      return;
    }
    const data = new FormData();
    data.append('name', 'TEST');
    data.append('athletes', JSON.stringify($athletes));
    data.append('type', $type);
    data.append('duration', '' + $duration);

    fetch('?/create', {
      method: 'POST',
      body: data
    });
    // const idNewCategory = createCategory(categoryName, $athletes, $type, $duration);
    // resetAthletes();
    // goto(`/categories/${idNewCategory}`);
  }
</script>

<CategoryEdit handleClick={handleCreate}>
  <span slot="label-button">Crea categoria</span>
</CategoryEdit>
