<script lang="ts">
  import { type, typeToLabel } from '../../../store/$type';
  import type { Category } from '../../../types/Category';

  export let value: Category['type'];
  export let disabled: boolean | undefined = false;

  const setType = () => {
    if ($type === value) {
      type.set(null);
      return;
    }
    type.set(value);
  };
</script>

<button on:click={setType} class:active={$type === value} class="w-full" {disabled}
  >{typeToLabel[value]}</button
>

<style lang="postcss">
  .active {
    @apply bg-primary-500 hover:bg-primary-700 text-white !important;
  }
</style>
