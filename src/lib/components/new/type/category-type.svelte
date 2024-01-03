<script lang="ts">
  import { athletes } from '../../../store/$athletes';
  import CategoryTypeButton from './category-type-button.svelte';
</script>

<div>
  <h2 class="h3">Tipo di categoria</h2>
  <div class="btn-group variant-filled w-full mt-3">
    <CategoryTypeButton value="pool" />
    <CategoryTypeButton value="double-pool" />
    <CategoryTypeButton value="brackets" disabled={$athletes.length < 6} />
  </div>
</div>
