<script lang='ts'>
  import type { Category } from '$lib/types/category.type';

  import {
    categoryTypeState,
    typeToLabel,
  } from '$lib/state/category-edit/category-type-state.svelte';

  interface Props {
    disabled?: boolean | undefined;
    value: Category['type'];
  }

  const { disabled = false, value }: Props = $props();

  const setType = () => {
    if (categoryTypeState.type === value) {
      categoryTypeState.type = null;
      return;
    }

    categoryTypeState.type = value;
  };
</script>

<button
  class='m-1 btn w-full preset-filled py-2'
  class:active={categoryTypeState.type === value}
  {disabled}
  type='button'
  onclick={(e) => {
    e.preventDefault();
    setType();
  }}>
  {typeToLabel[value]}
</button>

<style lang='postcss'>
  @reference "tailwindcss";
  @reference '@skeletonlabs/skeleton';

  .active {
    @apply bg-primary-500 text-white hover:bg-primary-700;
  }
</style>
