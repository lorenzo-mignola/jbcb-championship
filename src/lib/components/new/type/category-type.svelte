<script lang="ts" strictEvents>
  import { athletes } from '../../../store/$athletes';
  import CategoryTypeButton from './category-type-button.svelte';

  $: athletesCount = $athletes.length;
</script>

<div>
  <h2 class="h3">Tipo di categoria</h2>
  <div class="btn-group variant-filled w-full mt-3">
    <CategoryTypeButton value="pool" />
    <CategoryTypeButton disabled={athletesCount < 4} value="double_pool" />
    <CategoryTypeButton disabled={athletesCount < 6} value="brackets" />
  </div>
</div>
