<script lang='ts'>
  import PrintButton from '$lib/components/print-button.svelte';

  const { data } = $props();
  const ranking = $derived(data.ranking);
</script>

<div class='flex justify-between'>
  <h2 class='h2'>Classifica per club</h2>
  <PrintButton />
</div>

<div class='mt-5 table-wrap'>
  <table class='table text-center'>
    <thead>
      <tr>
        <th class='w-3/4'>Club</th>
        <th class='text-center text-xl'>🥇</th>
        <th class='text-center text-xl'>🥈</th>
        <th class='text-center text-xl'>🥉</th>
        <th class='text-center'>Tot</th>
      </tr>
    </thead>
    <tbody>
      {#each ranking as clubRanking (clubRanking.name)}
        <tr>
          <td>{clubRanking.name}</td>
          <td>{clubRanking.gold}</td>
          <td>{clubRanking.silver}</td>
          <td>{clubRanking.bronze}</td>
          <td>{clubRanking.gold + clubRanking.silver + clubRanking.bronze}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang='postcss'>
  @reference "tailwindcss";

  tr > td:nth-child(1) {
    @apply text-left;
  }
</style>
