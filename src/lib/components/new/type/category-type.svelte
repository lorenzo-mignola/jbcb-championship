<script lang="ts" strictEvents>
  import { athletes } from '../../../store/$athletes';
  import { type } from '../../../store/$type';
  import CategoryTypeButton from './category-type-button.svelte';

  $: athletesCount = $athletes.length;
  $: {
    if ($type === 'brackets' && athletesCount < 6) {
      type.set(null);
    }
    if ($type === 'double_pool' && athletesCount < 4) {
      type.set(null);
    }
  }
</script>

<div>
  <h2 class="h3">Tipo di categoria</h2>
  <div class="variant-filled btn-group mt-3 w-full">
    <CategoryTypeButton value="pool" />
    <CategoryTypeButton disabled={athletesCount < 4} value="double_pool" />
    <CategoryTypeButton disabled={athletesCount < 6} value="brackets" />
  </div>
</div>
