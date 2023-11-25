<script lang="ts">
  export let type: 'white' | 'blue';
</script>

<div
  class:judoka-white={type === 'white'}
  class:judoka-blue={type === 'blue'}
  class="judoka-white p-4 flex justify-between text-3xl font-bold"
>
  <div>Nome</div>
  <div>0</div>
</div>
