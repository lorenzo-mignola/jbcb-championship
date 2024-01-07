<script>
  import Settings from '$lib/icons/settings.svelte';
  import Card from './card.svelte';
</script>

<div class="home-container">
  <Card link="/new?category-name=" text="✨ Crea categoria ✨" />
  <Card link="/categories" text="💪 Visualizza categorie 💪" />
  <a class="btn variant-ringed-primary settings" href="/settings">
    <span><Settings /></span>
    <span>Impostazioni</span>
  </a>
</div>

<style lang="postcss">
  .home-container {
    @apply flex flex-col gap-4;
    @apply md:grid md:grid-cols-2 md:grid-rows-[6fr_1fr] md:h-[80vh];
  }

  .settings {
    grid-area: 2 / 1 / 3 / 3;
  }
</style>
