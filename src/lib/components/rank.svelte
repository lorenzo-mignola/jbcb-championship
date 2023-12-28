<script lang="ts">
  export let rank: number;
  export let name: string | undefined = '-';
  export let club: string | undefined;

  const getRanking = (rankValue: number) => {
    switch (rankValue) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
      case 4:
        return '🥉';

      default:
        return `#${rankValue}`;
    }
  };

  $: rankIcon = getRanking(rank);
</script>

<span
  >{rankIcon}
  {name}
  {#if club}
    <span class="text-sm italic">({club})</span>
  {/if}
</span>
