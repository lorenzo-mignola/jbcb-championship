<script>
  import { goto } from '$app/navigation';
  import { deleteAll, getAllCategories } from '$lib/db/methods';
  const categories = getAllCategories();
</script>

<div class="flex flex-col gap-3">
  {#each categories as category (category.id)}
    <a href={`/category/${category.id}`}>
      <button type="button" class="btn variant-filled-primary w-full text-xl p-4"
        >{category.name}</button
      >
    </a>
  {:else}
    <h3 class="h3">Nessuna categoria creata</h3>
  {/each}
  <button
    class="btn variant-ringed mt-10"
    on:click={() => {
      deleteAll();
      goto('/');
    }}>Cancella tutto</button
  >
</div>
