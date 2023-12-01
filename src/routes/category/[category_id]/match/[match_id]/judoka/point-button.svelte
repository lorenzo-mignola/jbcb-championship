<script lang="ts">
  export let action: (() => void) | undefined;
  export let disabled: boolean;
</script>

<button
  type="button"
  class="btn btn-lg variant-ringed hover:filter-none hover:shadow-md"
  {disabled}
  on:click={action}><slot /></button
>
