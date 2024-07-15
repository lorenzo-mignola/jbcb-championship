<script lang="ts" strictEvents>
  import { nextMatches } from '../../store/$next-matches';
</script>

<h3 class="h3">Prossimi incontri</h3>
<ul>
  {#each $nextMatches as nextMatch (nextMatch.id)}
    <li>
      {nextMatch.id}
    </li>
  {/each}
</ul>
