<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { AppBar, LightSwitch, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	const title = '🥋 JBCB Championship';
</script>

<AppBar slotTrail="place-content-end" background="bg-surface-100-800-token" class="sticky top-0">
	<h1 class="text-3xl font-bold">{title}</h1>
	<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>
<div class="container h-full p-2">
	<slot />
</div>
