<script lang="ts" strictEvents>
  import { localStorageCategoryName } from '../../store/$local-storage-match';
  import { nextMatches } from '../../store/$next-matches';
</script>

<div>
  <h3 class="h3">Prossimi incontri</h3>
  <h2 class="h2">{$localStorageCategoryName}</h2>
  <hr class="my-3" />
</div>

<ul class="col-auto mt-3 grid lg:grid-cols-3">
  {#each $nextMatches as nextMatch (nextMatch.id)}
    <li>
      <div class="mx-2 mb-3 flex flex-col">
        <span class="judoka-white judoka-next">{nextMatch.white?.name}</span>
        <span class="judoka-blue judoka-next">{nextMatch.blue?.name}</span>
      </div>
    </li>
  {/each}
</ul>

<style lang="postcss">
  .judoka-next {
    @apply mb-1 rounded-sm p-1;
  }
</style>
