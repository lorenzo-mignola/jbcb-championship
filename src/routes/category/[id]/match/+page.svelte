<script>
  import Buttons from './buttons.svelte';
  import Judoka from './judoka.svelte';

  export let data;
  const category = data.category;
</script>

<div class="text-xl">{category?.name ?? ''}</div>
<Judoka type="white" />
<Judoka type="blue" />
<div class="w-full text-center p-4 text-5xl my-5 font-bold">04:00</div>
<Buttons />
