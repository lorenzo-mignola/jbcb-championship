<script lang="ts" strictEvents>
  export let action: (() => void) | undefined;
  export let disabled: boolean | undefined = false;
  export let active: boolean | undefined = false;

  interface $$Slots {
    default: Record<string, never>;
    shortcut: Record<string, never>;
  }
</script>

<button
  class="variant-ringed btn mb-1 gap-1 md:btn-lg hover:shadow-md hover:filter-none md:mb-0"
  class:active
  {disabled}
  type="button"
  on:click={action}><slot /></button
>
<slot name="shortcut" />
