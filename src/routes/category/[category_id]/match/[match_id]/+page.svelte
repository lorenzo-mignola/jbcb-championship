<script lang="ts">
  import Buttons from './buttons.svelte';
  import Judoka from './judoka/judoka.svelte';
  import Timer from './timer.svelte';

  export let data;
  $: ({ category, match } = data);

  function setWinner(type: 'white' | 'blue') {
    if (!match) {
      return;
    }
    match!.winner = type;
  }

  function setDisqualification(type: 'white' | 'blue') {
    if (!match) {
      return;
    }
    const opposite = type === 'white' ? 'blue' : 'white';
    match![opposite].ippon = 10;
    match!.winner = opposite;
  }

  const athleteType = ['white', 'blue'] as const;
</script>

<div class="text-xl">
  {#if category?.name}
    {category.name}
  {:else}
    &nbsp;
  {/if}
</div>

{#if match}
  {#each athleteType as type}
    <Judoka
      {type}
      athlete={match[type]}
      end={Boolean(match.winner)}
      {setWinner}
      {setDisqualification}
    />
  {/each}
{/if}

<Timer />

<Buttons />
