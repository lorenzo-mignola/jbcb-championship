<script lang="ts" strictEvents>
  import Athletes from '../../../routes/new/athletes.svelte';
  import CategoryName from '../../../routes/new/category-name.svelte';
  import NewAthlete from '../../../routes/new/new-athlete.svelte';
  import { athletes } from '../../store/$athletes';
  import { categoryName } from '../../store/$category-name';
  import { type } from '../../store/$type';
  import CategoryDuration from './type/category-duration.svelte';
  import CategoryType from './type/category-type.svelte';

  interface $$Slots {
    'label-button': Record<string, never>;
  }

  export let handleClick: () => void;

  $: canClick = [$categoryName.length > 0, $athletes.length > 1, $type].every(Boolean);
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
  class="btn btn-xl variant-filled-secondary mx-auto w-full mt-10"
  disabled={!canClick}
  type="submit"
  on:click={handleClick}><slot name="label-button" /></button
>
