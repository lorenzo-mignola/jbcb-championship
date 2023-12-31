<script lang="ts">
  import { AppBar, LightSwitch, Modal, initializeStores } from '@skeletonlabs/skeleton';
  import { pwaInfo } from 'virtual:pwa-info';
  import '../app.postcss';

  initializeStores();
  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

  const title = '🥋 JBCB Championship';
</script>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html webManifestLink}
</svelte:head>

<Modal />

<AppBar
  slotTrail="place-content-end"
  background="bg-surface-200-700-token"
  shadow="shadow-md"
  class="sticky top-0 z-50 print:hidden"
>
  <a href="/"><h1 class="text-xl md:text-3xl font-bold">{title}</h1></a>
  <svelte:fragment slot="trail"><LightSwitch rounded="rounded-full" /></svelte:fragment>
</AppBar>
<div class="container h-full p-8 w-full mx-auto">
  <slot />
</div>
