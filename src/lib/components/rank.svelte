<script lang="ts" strictEvents>
  import { getRankingIcon } from '../models/ranking/category';

  interface Props {
    rank: number;
    name?: string | undefined;
    club: string | undefined;
  }

  let { rank, name = '-', club }: Props = $props();

  let rankIcon = $derived(getRankingIcon(rank));
</script>

<span
  >{rankIcon}
  {name}
  {#if club}
    <span class="text-sm italic">({club})</span>
  {/if}
</span>
