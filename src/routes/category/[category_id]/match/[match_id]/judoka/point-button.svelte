<script lang="ts">
  export let action: (() => void) | undefined;
  export let disabled: boolean | undefined = false;
  export let active: boolean | undefined = false;
</script>

<button
  type="button"
  class="btn mb-1 md:mb-0 md:btn-lg variant-ringed hover:filter-none hover:shadow-md"
  {disabled}
  class:active
  on:click={action}><slot /></button
>
