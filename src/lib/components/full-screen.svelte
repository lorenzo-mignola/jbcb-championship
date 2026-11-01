<script lang='ts'>
  import EnterFullScreen from '#lib/icons/enter-full-screen.svelte';
  import ExitFullScreen from '#lib/icons/exit-full-screen.svelte';

  let fullScreen = $state(false);

  const enterFullScreen = async () => {
    await document.documentElement.requestFullscreen();
    fullScreen = true;
  };

  const exitFullScreen = async () => {
    await document.exitFullscreen();
    fullScreen = false;
  };
</script>

<svelte:document
  onfullscreenchange={() => {
    fullScreen = Boolean(document.fullscreenElement);
  }}
/>

<div class='absolute right-6 bottom-6'>
  {#if fullScreen}
    <button
      class='local-btn-full-screen local-btn-close btn-icon btn-icon-xl'
      type='button'
      onclick={exitFullScreen}><ExitFullScreen /></button
    >
  {:else}
    <button
      class='local-btn-full-screen btn-icon btn-icon-xl'
      type='button'
      onclick={enterFullScreen}><EnterFullScreen /></button
    >
  {/if}
</div>

<style lang='postcss'>
  @reference "tailwindcss";
  @reference '@skeletonlabs/skeleton';

  .local-btn-close {
    @apply opacity-0;
  }

  .local-btn-full-screen {
    @apply preset-filled-primary-500 shadow-xl;
  }

  :global(body):hover .local-btn-close {
    @apply opacity-100;
  }
</style>
