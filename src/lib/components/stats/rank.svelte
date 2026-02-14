<script lang='ts'>
  import { getRankingIcon } from '$lib/models/ranking/category';

  interface Props {
    club: string | undefined;
    name?: string | undefined;
    rank: number;
  }

  const { club, name = '-', rank }: Props = $props();

  const rankIcon = $derived(getRankingIcon(rank));
</script>

<span
>{rankIcon}
  {name}
  {#if club}
    <span class='text-sm italic'>({club})</span>
  {/if}
</span>
