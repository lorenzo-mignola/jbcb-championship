<script lang="ts" strictEvents>
  import { shortcut } from '@svelte-put/shortcut';

  import type { JudokaType } from '../types/match.type';
  import { getKey } from './get-key';
  import { runIfNotDisabled } from './run-if-not-disabled';
  import type { ShortcutFunction } from './shortcut-function.type';

  export let callback: ShortcutFunction;
  export let type: JudokaType;
  export let disabled: boolean = false;

  $: key = getKey('ippon')(type);
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      key,
      callback: runIfNotDisabled(callback, disabled)
    }
  }}
/>
