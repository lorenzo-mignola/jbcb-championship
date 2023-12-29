<script lang="ts">
  import CategoryTypeButton from './category-type-button.svelte';
</script>

<div>
  <h2 class="h2">Tipo di categoria</h2>
  <div class="btn-group variant-filled w-full mt-3">
    <CategoryTypeButton value="pool" />
    <CategoryTypeButton value="double-pool" />
    <CategoryTypeButton value="brackets" />
  </div>
</div>
