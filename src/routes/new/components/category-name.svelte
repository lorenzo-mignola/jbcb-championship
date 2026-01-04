<script lang='ts'>
  import { categoryNameState } from '../../../lib/state/category-name-state.svelte';
</script>

<label class='label'>
  <h2 class='h4'>Nome categoria</h2>
  <input
    class='input'
    placeholder='Categoria'
    title='Nome categoria'
    type='text'
    bind:value={categoryNameState.name}
  />
  <span class='text-sm'>Es. M U18 -60Kg</span>
</label>
