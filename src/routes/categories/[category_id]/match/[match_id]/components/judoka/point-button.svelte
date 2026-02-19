<script lang='ts'>
  interface Props {
    action?: (() => void);
    active?: boolean;
    children?: import('svelte').Snippet;
    disabled?: boolean;
    shortcut?: import('svelte').Snippet;
  }

  const {
    action,
    active = false,
    children,
    disabled = false,
    shortcut,
  }: Props = $props();
</script>

<button
  class='
    mb-1 btn gap-1 preset-outlined
    hover:shadow-lg hover:brightness-100! hover:filter-none
    md:mb-0 md:btn-lg
  '
  class:active
  {disabled}
  type='button'
  onclick={(e) => {
    (e.currentTarget as HTMLButtonElement).blur();
    action?.();
  }}>{@render children?.()}</button
>
{@render shortcut?.()}
