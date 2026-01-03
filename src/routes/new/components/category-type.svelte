<script lang='ts'>
  import { athletesState } from '../../../lib/state/athletes-state.svelte';
  import { categoryTypeState } from '../../../lib/state/category-type-state.svelte';
  import CategoryTypeButton from './category-type-button.svelte';

  const athletesCount = $derived(athletesState.athletes.length);

  $effect.pre(() => {
    if (categoryTypeState.type === 'brackets' && athletesCount < 6) {
      categoryTypeState.type = null;
    }
    if (categoryTypeState.type === 'double_pool' && athletesCount < 4) {
      categoryTypeState.type = null;
    }
  });
</script>

<div>
  <h2 class='h4'>Tipo di categoria</h2>
  <div class='mt-3 flex w-full rounded-lg preset-filled'>
    <CategoryTypeButton value='pool' />
    <CategoryTypeButton disabled={athletesCount < 4} value='double_pool' />
    <CategoryTypeButton disabled={athletesCount < 6} value='brackets' />
  </div>
</div>
