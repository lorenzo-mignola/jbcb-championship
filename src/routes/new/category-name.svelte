<script lang="ts" strictEvents>
  import { categoryName } from '$lib/store/$category-name';
</script>

<label class="label">
  <h2 class="h3">Nome categoria</h2>
  <input
    class="input"
    placeholder="Categoria"
    title="Nome categoria"
    type="text"
    bind:value={$categoryName}
  />
  <span class="text-sm">Es. M U18 -60Kg</span>
</label>
