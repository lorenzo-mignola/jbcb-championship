<script lang='ts'>
  import { Dialog } from '@skeletonlabs/skeleton-svelte';

  import MoveIcon from '../icons/move-icon.svelte';
  import CategoryMoveDialog from './category-move-dialog.svelte';

  interface Props {
    athleteId: string;
  }

  const { athleteId }: Props = $props();
  let open = $state(false);
</script>

<Dialog onOpenChange={details => open = details.open} {open}>
  <Dialog.Trigger class='btn-icon preset-outlined-secondary-500' title='Sposta' type='button'>
    <MoveIcon />
  </Dialog.Trigger>
  <CategoryMoveDialog {athleteId} closeDialog={() => open = false} />

</Dialog>
