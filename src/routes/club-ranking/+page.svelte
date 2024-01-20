<script lang="ts" strictEvents>
  export let data;
  $: ranking = data.ranking;
</script>

<h2 class="h2">Classifica per club</h2>

<div class="table-container mt-5">
  <table class="table table-hover text-center">
    <thead>
      <tr class="text-xl">
        <th class="w-3/4">Club</th>
        <th class="text-center">🥇</th>
        <th class="text-center">🥈</th>
        <th class="text-center">🥉</th>
      </tr>
    </thead>
    <tbody>
      {#each ranking as clubRanking (clubRanking.name)}
        <tr>
          <td>{clubRanking.name}</td>
          <td>{clubRanking.gold}</td>
          <td>{clubRanking.silver}</td>
          <td>{clubRanking.bronze}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang="postcss">
  tr > td:nth-child(1) {
    @apply text-left;
  }
</style>
