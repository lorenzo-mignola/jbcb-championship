<script>
  import Print from '$lib/icons/print.svelte';
</script>

<div class='print:hidden'>
  <button class='btn preset-filled' type='button' onclick={() => window.print()}>
    <span><Print /></span>
    <span>Stampa</span>
  </button>
</div>
