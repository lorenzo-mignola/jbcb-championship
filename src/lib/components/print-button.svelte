<script>
  import Print from '$lib/icons/print.svelte';
</script>

<div class="print:hidden">
  <button class="btn variant-filled" type="button" on:click={() => window.print()}>
    <span><Print /></span>
    <span>Stampa</span>
  </button>
</div>
