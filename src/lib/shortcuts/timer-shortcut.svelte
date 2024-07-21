<script lang="ts" strictEvents>
  import { shortcut } from '@svelte-put/shortcut';

  import { getKey } from './get-key';
  import { runIfNotDisabled } from './run-if-not-disabled';
  import type { ShortcutFunction } from './shortcut-function.type';

  export let callback: ShortcutFunction;
  export let disabled: boolean = false;

  const key = getKey('play')();
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      key,
      callback: runIfNotDisabled(callback, disabled)
    }
  }}
/>
