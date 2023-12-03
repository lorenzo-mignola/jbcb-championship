<script lang="ts">
  export let action: (() => void) | undefined;
  export let disabled: boolean;
  export let active: boolean | undefined = false;
</script>

<button
  type="button"
  class="btn btn-lg variant-ringed hover:filter-none hover:shadow-md"
  {disabled}
  class:active
  on:click={action}><slot /></button
>
