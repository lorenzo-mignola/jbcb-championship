<script lang='ts'>
  import AthleteList from '$lib/components/athlete-list.svelte';
  import Delete from '$lib/icons/delete.svelte';
  import { athletesState } from '$lib/state/category-edit/athletes-state.svelte';

  const iconAction = (id: string) => athletesState.removeAthlete(id);
</script>

<AthleteList athletes={athletesState.athletes} {iconAction} iconActionTitle='Elimina'>
  {#snippet icon()}
    <Delete />
  {/snippet}
</AthleteList>
