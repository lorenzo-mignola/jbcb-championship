<script lang="ts" strictEvents>
  import { invalidateAll } from '$app/navigation';
  import Reload from '$lib/icons/reload.svelte';
  import { AppBar, LightSwitch, Modal, initializeStores } from '@skeletonlabs/skeleton';
  import { pwaInfo } from 'virtual:pwa-info';
  import '../app.postcss';

  interface $$Slots {
    default: Record<string, never>;
  }

  initializeStores();
  // eslint-disable-next-line svelte/no-immutable-reactive-statements -- copied
  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

  const title = '🥋 JBCB Championship';
</script>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html webManifestLink}
</svelte:head>

<Modal />

<AppBar
  class="sticky top-0 z-50 print:hidden"
  background="bg-surface-200-700-token"
  shadow="shadow-md"
  slotTrail="place-content-end"
>
  <a href="/"><h1 class="text-xl md:text-3xl font-bold">{title}</h1></a>
  <svelte:fragment slot="trail">
    <button
      class="btn-icon btn-sm hover:variant-soft-primary"
      title="Aggiorna"
      type="button"
      on:click|preventDefault={() => invalidateAll()}><Reload /></button
    >
    <LightSwitch rounded="rounded-full" />
  </svelte:fragment>
</AppBar>
<div class="container h-full p-8 w-full mx-auto">
  <slot />
</div>
