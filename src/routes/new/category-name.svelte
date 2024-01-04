<script lang="ts" strictEvents>
  import { CATEGORY_NAME } from '../../lib/utils/constants';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  const categoryName = $page.url.searchParams.get(CATEGORY_NAME) ?? '';

  let name = categoryName;

  function handleSetCategoryName() {
    $page.url.searchParams.set(CATEGORY_NAME, name);
    goto(`?${$page.url.searchParams.toString()}`);
  }
</script>

<label class="label">
  <h2 class="h3">Nome categoria</h2>
  <input
    class="input"
    placeholder="Categoria"
    title="Nome categoria"
    type="text"
    on:focusout={handleSetCategoryName}
    bind:value={name}
  />
</label>
