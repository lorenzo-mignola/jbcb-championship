<script lang="ts" strictEvents>
  import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
  import MoveIcon from '../../icons/move-icon.svelte';

  export let athleteId: string;

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
  on:click|preventDefault={() => modalStore.trigger(modal)}
>
  <MoveIcon />
</button>
