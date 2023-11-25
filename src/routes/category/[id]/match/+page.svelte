<script>
  import Buttons from './buttons.svelte';
  import Judoka from './judoka.svelte';
  import Timer from './timer.svelte';

  export let data;
  const category = data.category;
</script>

<div class="text-xl">{category?.name ?? ''}&nbsp;</div>

<Judoka type="white" />
<Judoka type="blue" />

<Timer />

<Buttons />
