<script lang="ts">
  import Delete from '../../icons/delete.svelte';
  import AthleteList from '../../lib/components/athlete-list.svelte';
  import { athletes, removeAthlete } from '../../lib/store/$athletes';
  const iconAction = (id: string) => removeAthlete(id);
</script>

<AthleteList athletes={$athletes} {iconAction}>
  <Delete slot="icon" />
</AthleteList>
