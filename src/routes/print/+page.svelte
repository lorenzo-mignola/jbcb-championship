<script lang="ts" strictEvents>
  import Card from '$lib/components/card.svelte';
  import { tournament } from '$lib/store/$tournament';
</script>

<div class="flex flex-col gap-4">
  <Card
    disabled={!$tournament}
    link={`/categories/print/registered?tournament=${$tournament}`}
    text="📋 Iscrizioni categorie 📋"
  />

  <Card
    disabled={!$tournament}
    link={`/club-ranking?tournament=${$tournament}`}
    text="🎊 Classifica club 🎊"
  />

  <Card
    disabled={!$tournament}
    link={`/categories/print/summary?tournament=${$tournament}`}
    text="🏅 Classifiche categorie 🏅"
  />
</div>
