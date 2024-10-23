<script lang="ts" strictEvents>
  interface Props {
    action: (() => void) | undefined;
    disabled?: boolean | undefined;
    active?: boolean | undefined;
    children?: import('svelte').Snippet;
    shortcut?: import('svelte').Snippet;
  }

  let { action, disabled = false, active = false, children, shortcut }: Props = $props();

  interface $$Slots {
    default: Record<string, never>;
    shortcut: Record<string, never>;
  }
</script>

<button
  class="variant-ringed btn mb-1 gap-1 md:btn-lg hover:shadow-md hover:filter-none md:mb-0"
  class:active
  {disabled}
  type="button"
  onclick={action}>{@render children?.()}</button
>
{@render shortcut?.()}
