<script lang="ts" strictEvents>
  import { shortcut } from '@svelte-put/shortcut';

  import { getKey } from './get-key';
  import { runIfNotDisabled } from './run-if-not-disabled';
  import type { ShortcutFunction } from './shortcut-function.type';

  interface Props {
    callback: ShortcutFunction;
    disabled?: boolean;
  }

  let { callback, disabled = false }: Props = $props();

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
