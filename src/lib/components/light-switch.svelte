<script lang='ts'>
  import { Switch } from '@skeletonlabs/skeleton-svelte';

  import Moon from '../icons/moon.svelte';
  import Sun from '../icons/sun.svelte';

  let checked = $state(false);

  $effect(() => {
    const mode = localStorage.getItem('jbcb-championship-mode') || 'light';
    checked = mode === 'dark';
  });

  const onCheckedChange = (event: { checked: boolean }) => {
    const mode = event.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem('jbcb-championship-mode', mode);
    checked = event.checked;
  };
</script>

<svelte:head>
  <script>
    const mode = localStorage.getItem('jbcb-championship-mode') || 'light';
    document.documentElement.setAttribute('data-mode', mode);
  </script>
</svelte:head>

<Switch {checked} {onCheckedChange}>
  <Switch.Control class='
    border border-surface-100
    dark:border-surface-700
  '>
    <Switch.Thumb>
      <Switch.Context>
        {#snippet children(switch_)}
          {#if switch_().checked}
            <Sun class='size-3' />
          {:else}
            <Moon class='size-3' />
          {/if}
        {/snippet}
      </Switch.Context>
    </Switch.Thumb>
  </Switch.Control>
  <Switch.HiddenInput />
</Switch>
