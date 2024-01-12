<script lang="ts" strictEvents>
  import { type, typeToLabel } from '../../../store/$type';
  import type { Category } from '../../../types/category.type';

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

<button
  class="w-full"
  class:active={$type === value}
  {disabled}
  type="button"
  on:click|preventDefault={setType}>{typeToLabel[value]}</button
>

<style lang="postcss">
  .active {
    @apply bg-primary-500 hover:bg-primary-700 text-white !important;
  }
</style>
