<script lang="ts">
  import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
  import { pwaInfo } from 'virtual:pwa-info';
  import '../app.postcss';

  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

  const title = '🥋 JBCB Championship';
</script>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html webManifestLink}
</svelte:head>

<AppBar
  slotTrail="place-content-end"
  background="bg-surface-200-700-token"
  shadow="shadow-md"
  class="sticky top-0"
>
  <a href="/"><h1 class="text-3xl font-bold">{title}</h1></a>
  <svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>
<div class="container h-full p-8 w-full mx-auto">
  <slot />
</div>
