<script lang="ts">
  export let type: 'white' | 'blue';
</script>

<div class:judoka-white={type === 'white'} class:judoka-blue={type === 'blue'}>
  <div>Nome</div>
  <div>0</div>
</div>
