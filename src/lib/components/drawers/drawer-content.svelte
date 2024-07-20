<script lang="ts" strictEvents>
  import { getDrawerStore } from '@skeletonlabs/skeleton';

  import NextMatchDrawer from './next-match-drawer.svelte';

  const drawerStore = getDrawerStore();
</script>

<div class="p-5">
  <!-- eslint-disable-next-line svelte/prefer-destructured-store-props -->
  {#if $drawerStore.id === 'next-match'}
    <NextMatchDrawer />
  {/if}
</div>
