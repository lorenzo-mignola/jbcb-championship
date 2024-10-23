<script lang="ts" strictEvents>
  import { preventDefault } from 'svelte/legacy';

  import { type, typeToLabel } from '../../../store/$type';
  import type { Category } from '../../../types/category.type';

  interface Props {
    value: Category['type'];
    disabled?: boolean | undefined;
  }

  let { value, disabled = false }: Props = $props();

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
  onclick={preventDefault(setType)}>{typeToLabel[value]}</button
>

<style lang="postcss">
  .active {
    @apply bg-primary-500 text-white hover:bg-primary-700 !important;
  }
</style>
