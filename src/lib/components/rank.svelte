<script lang="ts" strictEvents>
  import { getRankingIcon } from '../models/ranking/category';

  export let rank: number;
  export let name: string | undefined = '-';
  export let club: string | undefined;

  $: rankIcon = getRankingIcon(rank);
</script>

<span
  >{rankIcon}
  {name}
  {#if club}
    <span class="text-sm italic">({club})</span>
  {/if}
</span>
