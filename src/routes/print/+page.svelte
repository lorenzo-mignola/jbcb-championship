<script lang='ts'>
  import Card from '$lib/components/card.svelte';
  import { tournamentState } from '$lib/state/settings/tournament-state';
</script>

<div class='flex flex-col gap-4'>
  <Card
    disabled={!tournamentState.tournament}
    link={`/categories/print/registered?tournament=${tournamentState.tournament}`}
    text='📋 Iscrizioni categorie 📋'
  />

  <Card
    disabled={!tournamentState.tournament}
    link={`/club-ranking?tournament=${tournamentState.tournament}`}
    text='🎊 Classifica club 🎊'
  />

  <Card
    disabled={!tournamentState.tournament}
    link={`/categories/print/summary?tournament=${tournamentState.tournament}`}
    text='🏅 Classifiche categorie 🏅'
  />
</div>
