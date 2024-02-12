<script lang="ts" strictEvents>
  export let link: string;
  export let text: string;
  export let disabled = false;
</script>

<a
  class="card flex items-center justify-center bg-primary-500 p-8 text-xl text-white dark:bg-primary-600 xl:text-2xl"
  class:disabled
  class:enabled={!disabled}
  href={!disabled ? link : '/'}>{text}</a
>

<style lang="postcss">
  .enabled {
    @apply card-hover hover:shadow-sm hover:shadow-primary-500;
  }
  .disabled {
    @apply cursor-not-allowed !opacity-50;
  }
</style>
