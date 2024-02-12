<script lang="ts" strictEvents>
  import Athletes from '../../../routes/new/athletes.svelte';
  import CategoryName from '../../../routes/new/category-name.svelte';
  import NewAthlete from '../../../routes/new/new-athlete.svelte';
  import { athletes } from '../../store/$athletes';
  import { categoryName } from '../../store/$category-name';
  import { type } from '../../store/$type';
  import LoadingSpinner from '../loading-spinner.svelte';
  import CategoryDuration from './type/category-duration.svelte';
  import CategoryType from './type/category-type.svelte';

  interface $$Slots {
    'label-button': Record<string, never>;
  }

  export let handleClick: () => void;

  $: canClick = [$categoryName.length > 0, $athletes.length > 1, $type].every(Boolean);
  let loading = false;
</script>

<div class="flex flex-col gap-4">
  <CategoryName />
  <CategoryDuration />
</div>

<div class="my-7">
  <Athletes />
  <NewAthlete />
</div>

<CategoryType />

<button
  class="variant-filled-secondary btn btn-xl mx-auto mb-1 mt-10 flex w-full items-end"
  disabled={!canClick || loading}
  type="submit"
  on:click={() => {
    loading = true;
    handleClick();
  }}
  ><slot name="label-button" />
  {#if loading}
    <LoadingSpinner />
  {/if}
</button>
