<script>
  import Buttons from './buttons.svelte';
  import Judoka from './judoka/judoka.svelte';
  import Timer from './timer.svelte';

  export let data;
  const category = data.category;
</script>

<div class="text-xl">
  {#if category?.name}
    {category.name}
  {:else}
    &nbsp;
  {/if}
</div>

<Judoka type="white" />
<Judoka type="blue" />

<Timer />

<Buttons />
