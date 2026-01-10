<script lang='ts'>
  import { shortcut } from '@svelte-put/shortcut';

  import type { ShortcutFunction } from './shortcut-function.type';

  import { getKey } from './get-key';
  import { runIfNotDisabled } from './run-if-not-disabled';

  interface Props {
    callback: ShortcutFunction;
    disabled?: boolean;
  }

  const { callback, disabled = false }: Props = $props();

  const key = getKey('play')();
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      callback: runIfNotDisabled(callback, disabled),
      key,
    },
  }}
/>
