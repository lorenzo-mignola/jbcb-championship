<script lang='ts'>
  interface Props {
    disabled?: boolean;
    link: string;
    text: string;
  }

  const { disabled = false, link, text }: Props = $props();
</script>

<a
  class='
    flex items-center justify-center card bg-primary-500 p-8 text-xl text-white
    xl:text-2xl
    dark:bg-primary-600
  '
  class:disabled
  class:enabled={!disabled}
  href={!disabled ? link : '/'}>{text}</a
>

<style lang='postcss'>
  @reference "tailwindcss";
  @reference '@skeletonlabs/skeleton';

  .enabled {
  }
  .enabled:hover {
    @apply shadow-xs shadow-primary-500;
  }
  .disabled {
    @apply cursor-not-allowed opacity-50!;
  }
</style>
