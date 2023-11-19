<script lang="ts">
  import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
  import '../app.postcss';

  const title = '🥋 JBCB Championship';
</script>

<AppBar slotTrail="place-content-end" background="bg-surface-100-800-token" class="sticky top-0">
  <a href="/"><h1 class="text-3xl font-bold">{title}</h1></a>
  <svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>
<div class="container h-full p-8 w-full mx-auto">
  <slot />
</div>
