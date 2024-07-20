<script lang="ts" strictEvents>
  import { shortcut } from '@svelte-put/shortcut';

  import type { JudokaType } from '../types/match.type';
  import { getKey } from './get-key';
  import type { ShortcutFunction } from './shortcut-function.type';

  export let callback: ShortcutFunction;
  export let type: JudokaType;

  $: key = getKey('ippon')(type);
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      key,
      callback
    }
  }}
/>
