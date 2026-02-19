<script lang='ts'>
  import { shortcut } from '@svelte-put/shortcut';

  import type { JudokaType } from '../../types/match.type';
  import type { ShortcutFunction } from './shortcut-function.type';

  import { getKey } from './get-key';
  import { runIfNotDisabled } from './run-if-not-disabled';

  interface Props {
    callback: ShortcutFunction;
    disabled?: boolean;
    type: JudokaType;
  }

  const { callback, disabled = false, type }: Props = $props();

  const key = $derived(getKey('yuko')(type));
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      callback: runIfNotDisabled(callback, disabled),
      key,
    },
  }}
/>
