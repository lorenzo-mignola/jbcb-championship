<script lang="ts">
  import Delete from '../../icons/delete.svelte';
  import AthleteList from '../../lib/components/AthleteList.svelte';
  import { athletes, removeAthlete } from './$athletes';
  const iconAction = (id: string) => removeAthlete(id);
</script>

<AthleteList athletes={$athletes} {iconAction}>
  <Delete slot="icon" />
</AthleteList>
