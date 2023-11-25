<script>
  import Play from '../../../../icons/play.svelte';
  import Stop from '../../../../icons/stop.svelte';

  let play = true;
</script>

<button class="card p-2 text-8xl w-full flex justify-center" on:click={() => (play = !play)}>
  <div>
    {#if play}
      <Play />
    {:else}
      <Stop />
    {/if}
  </div>
</button>

<style>
  button:focus {
    outline: 0;
  }
</style>
