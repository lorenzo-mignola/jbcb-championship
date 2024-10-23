<script lang="ts" strictEvents>
  import { shortcut } from '@svelte-put/shortcut';

  import type { JudokaType } from '../types/match.type';
  import { getKey } from './get-key';
  import { runIfNotDisabled } from './run-if-not-disabled';
  import type { ShortcutFunction } from './shortcut-function.type';

  interface Props {
    callback: ShortcutFunction;
    type: JudokaType;
    disabled?: boolean;
  }

  let { callback, type, disabled = false }: Props = $props();

  let key = $derived(getKey('wazari')(type));
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      key,
      callback: runIfNotDisabled(callback, disabled)
    }
  }}
/>
