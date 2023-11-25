<script lang="ts">
  import type { Category } from '../../../lib/types/Category';
  import { type, typeToLabel } from './type';

  export let value: Category['type'];

  const setType = () => {
    if ($type === value) {
      type.set(null);
      return;
    }
    type.set(value);
  };
</script>

<button on:click={setType} class:active={$type === value} class="w-full"
  >{typeToLabel[value]}</button
>

<style lang="postcss">
  .active {
    @apply bg-primary-500 hover:bg-primary-700 text-white !important;
  }
</style>
