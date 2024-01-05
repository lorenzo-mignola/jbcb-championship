<script>
  import Settings from '$lib/icons/settings.svelte';
  import Card from './card.svelte';

  export let data;
</script>

<div class="flex flex-col gap-3">
  {JSON.stringify(data.c)}
  <Card link="/new?category-name=" text="Crea categoria" />
  <Card link="/categories" text="Visualizza tutte le categorie" />
  <a class="btn variant-ringed-primary" href="/settings">
    <span><Settings /></span>
    <span>Impostazioni</span>
  </a>
</div>
