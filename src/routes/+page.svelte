<script>
  import Card from '$lib/components/card.svelte';
  import Settings from '$lib/icons/settings.svelte';
  import { tournamentState } from '$lib/state/settings/tournament-state';
</script>

<div class='local-home-container'>
  <Card
    link='/new'
    text='✨ Crea categoria ✨'
  />
  <Card
    link={`/categories?tournament=${tournamentState.tournament}`}
    text='💪 Visualizza categorie 💪'
  />
  <Card
    disabled={!tournamentState.tournament}
    link='/print'
    text='🖨️ Stampa 🖨'
  />

  <a class='local-settings btn preset-outlined-primary-500' href='/settings'>
    <span><Settings /></span>
    <span>Impostazioni</span>
  </a>
</div>

<style lang='postcss'>
  @reference "tailwindcss";
  @reference '@skeletonlabs/skeleton';

  .local-home-container {
    @apply flex flex-col gap-4;
    @apply lg:grid lg:h-[80vh] lg:grid-cols-3 lg:grid-rows-[6fr_1fr];
  }

  .local-settings {
    grid-area: 2 / 1 / 3 / 4;
  }
</style>
