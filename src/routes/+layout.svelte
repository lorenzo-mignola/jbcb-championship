<script lang='ts'>
  import './layout.css';

  import { AppBar, Toast } from '@skeletonlabs/skeleton-svelte';
  import { invalidateAll } from '$app/navigation';
  import { pwaInfo } from 'virtual:pwa-info';

  import Reload from '$lib/icons/reload.svelte';
  import { toaster } from '$lib/state/utils/toaster-state';

  import Avatar from '../lib/auth/avatar.svelte';
  import LightSwitch from '../lib/components/light-switch.svelte';

  const { children } = $props();
  const webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');

  const title = '🥋 JBCB Championship';
</script>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags  -->
  {@html webManifestLink}
</svelte:head>

<AppBar class='
  sticky top-0 z-50 bg-surface-200-800 shadow-md
  print:hidden
'>
  <AppBar.Toolbar class='flex'>
    <AppBar.Lead>
      <a href='/'><h1 class='
        text-xl font-bold
        md:text-3xl
      '>{title}</h1></a>
    </AppBar.Lead>
    <AppBar.Trail class='flex items-center'>
      <Avatar />
      <button
        class='
          btn-icon
          hover:preset-tonal-primary
        '
        title='Aggiorna'
        type='button'
        onclick={async (event) => {
          event.preventDefault();
          await invalidateAll();
        }}><Reload /></button
      >
      <LightSwitch />
    </AppBar.Trail>
  </AppBar.Toolbar>
</AppBar>

<div class='container mx-auto size-full p-8'>
  {@render children()}

  <Toast.Group {toaster}>
    {#snippet children(toast)}
      <Toast {toast}>
        <Toast.Message>
          <Toast.Title>{toast.title}</Toast.Title>
          <Toast.Description>{toast.description}</Toast.Description>
        </Toast.Message>
        <Toast.CloseTrigger />
      </Toast>
    {/snippet}
  </Toast.Group>
</div>
