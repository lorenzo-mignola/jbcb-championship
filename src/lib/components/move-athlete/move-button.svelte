<script lang="ts" strictEvents>
  import { preventDefault } from 'svelte/legacy';

  import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

  import MoveIcon from '../../icons/move-icon.svelte';

  interface Props {
    athleteId: string;
  }

  let { athleteId }: Props = $props();

  const modalStore = getModalStore();
  const modal: ModalSettings = {
    type: 'component',
    component: 'categoryMoveSelect',
    meta: {
      athleteId
    }
  };
</script>

<button
  class="variant-ringed-secondary btn-icon"
  title="Sposta"
  type="button"
  onclick={preventDefault(() => modalStore.trigger(modal))}
>
  <MoveIcon />
</button>
