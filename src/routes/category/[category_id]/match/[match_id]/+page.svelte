<script>
  import Buttons from './buttons.svelte';
  import Judoka from './judoka/judoka.svelte';
  import Timer from './timer.svelte';

  export let data;
  const category = data.category;
  const match = data.match;
</script>

<div class="text-xl">
  {#if category?.name}
    {category.name}
  {:else}
    &nbsp;
  {/if}
</div>

{#if match}
  <Judoka type="white" athlete={match.white} />
  <Judoka type="blue" athlete={match.blue} />
{/if}

<Timer />

<Buttons />
