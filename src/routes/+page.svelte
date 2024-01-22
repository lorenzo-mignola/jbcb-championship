<script>
  import Settings from '$lib/icons/settings.svelte';
  import { tournament } from '$lib/store/$tournament';
  import Card from './card.svelte';
</script>

<div class="home-container">
  <Card link="/new" text="✨ Crea categoria ✨" />
  <Card link={`/categories?tournament=${$tournament}`} text="💪 Visualizza categorie 💪" />
  <Card
    disabled={!$tournament}
    link={`/club-ranking?tournament=${$tournament}`}
    text="🏅 Classifica club 🏅"
  />

  <a class="btn variant-ringed-primary settings" href="/settings">
    <span><Settings /></span>
    <span>Impostazioni</span>
  </a>
</div>

<style lang="postcss">
  .home-container {
    @apply flex flex-col gap-4;
    @apply lg:grid lg:grid-cols-3 lg:grid-rows-[6fr_1fr] lg:h-[80vh];
  }

  .settings {
    grid-area: 2 / 1 / 3 / 4;
  }
</style>
