<script lang="ts" strictEvents>
  export let link: string;
  export let text: string;
  export let disabled = false;
</script>

<a
  class="card text-xl p-8 flex items-center justify-center bg-primary-500 dark:bg-primary-600 text-white"
  class:disabled
  class:enabled={!disabled}
  href={!disabled ? link : '/'}>{text}</a
>

<style lang="postcss">
  .enabled {
    @apply card-hover hover:shadow-sm hover:shadow-primary-500;
  }
  .disabled {
    @apply !opacity-50 cursor-not-allowed;
  }
</style>
