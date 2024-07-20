<script lang="ts" strictEvents>
  import { shortcut } from '@svelte-put/shortcut';

  import type { ShortcutFunction } from './shortcut-function.type';

  export let callback: ShortcutFunction;
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      key: ' ',
      callback
    }
  }}
/>
