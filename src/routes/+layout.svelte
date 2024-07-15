<script lang="ts" strictEvents>
  import '../app.postcss';

  import {
    AppBar,
    initializeStores,
    LightSwitch,
    Modal,
    type ModalComponent,
    Toast
  } from '@skeletonlabs/skeleton';
  import { pwaInfo } from 'virtual:pwa-info';

  import { invalidateAll } from '$app/navigation';
  import Reload from '$lib/icons/reload.svelte';

  import CategoryMoveDialog from '../lib/components/move-athlete/category-move-dialog.svelte';

  interface $$Slots {
    default: Record<string, never>;
  }

  initializeStores();
  // eslint-disable-next-line svelte/no-immutable-reactive-statements -- copied
  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

  const title = '🥋 JBCB Championship';

  const modalRegistry: Record<string, ModalComponent> = {
    categoryMoveSelect: {
      ref: CategoryMoveDialog
    }
  };
</script>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html webManifestLink}
</svelte:head>

<Modal buttonTextCancel="Annulla" components={modalRegistry} />
<Toast />

<AppBar
  class="sticky top-0 z-50 print:hidden"
  background="bg-surface-200-700-token"
  shadow="shadow-md"
  slotTrail="place-content-end"
>
  <a href="/"><h1 class="text-xl font-bold md:text-3xl">{title}</h1></a>
  <svelte:fragment slot="trail">
    <button
      class="btn-icon btn-sm hover:variant-soft-primary"
      title="Aggiorna"
      type="button"
      on:click|preventDefault={async () => {
        await invalidateAll();
      }}><Reload /></button
    >
    <LightSwitch rounded="rounded-full" />
  </svelte:fragment>
</AppBar>
<div class="container mx-auto h-full w-full p-8">
  <slot />
</div>
