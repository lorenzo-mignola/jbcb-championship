<script lang="ts" strictEvents>
  import AthleteList from '$lib/components/athlete-list.svelte';
  import Delete from '$lib/icons/delete.svelte';
  import { athletes, removeAthlete } from '$lib/store/$athletes';

  const iconAction = (id: string) => removeAthlete(id);
</script>

<AthleteList athletes={$athletes} {iconAction} iconActionTitle="Elimina">
  <Delete slot="icon" />
</AthleteList>
