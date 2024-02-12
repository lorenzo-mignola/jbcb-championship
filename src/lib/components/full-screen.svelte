<script lang="ts" strictEvents>
  import EnterFullScreen from '../icons/enter-full-screen.svelte';
  import ExitFullScreen from '../icons/exit-full-screen.svelte';

  let fullScreen = false;

  const enterFullScreen = async () => {
    await document.documentElement.requestFullscreen();
    fullScreen = true;
  };

  const exitFullScreen = async () => {
    await document.exitFullscreen();
    fullScreen = false;
  };
</script>

<div class="absolute bottom-6 right-6">
  {#if fullScreen}
    <button
      class="btn-full-screen btn-icon btn-icon-xl btn-close"
      type="button"
      on:click={exitFullScreen}><ExitFullScreen /></button
    >
  {:else}
    <button class="btn-full-screen btn-icon btn-icon-xl" type="button" on:click={enterFullScreen}
      ><EnterFullScreen /></button
    >
  {/if}
</div>

<style lang="postcss">
  .btn-close {
    @apply opacity-0;
  }

  .btn-full-screen {
    @apply variant-filled-primary shadow-xl;
  }

  :global(body):hover .btn-close {
    @apply opacity-100;
  }
</style>
