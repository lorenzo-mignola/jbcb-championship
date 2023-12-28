<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { isMobile } from '../../../lib/utils/mobile.js';

  export let data;

  onMount(() => {
    if (browser && !isMobile()) {
      data.autoPrint && window.print();
    }
  });
</script>

<div class="print:hidden">
  <button type="button" class="btn">Print</button>
</div>

<div>
  <p>Nome</p>
  <p>Risultati</p>
</div>
