<script lang="ts" strictEvents>
  export let action: (() => void) | undefined;
  export let disabled: boolean | undefined = false;
  export let active: boolean | undefined = false;

  interface $$Slots {
    default: Record<string, never>;
  }
</script>

<button
  class="btn mb-1 md:mb-0 md:btn-lg variant-ringed hover:filter-none hover:shadow-md gap-1"
  class:active
  {disabled}
  type="button"
  on:click={action}><slot /></button
>
