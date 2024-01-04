<script lang="ts" strictEvents>
  import { getSettings } from '../../lib/db/methods';
  import { addAthlete } from '../../lib/store/$athletes';

  const clubs = getSettings().clubs || [];

  let name = '';
  let club = '';

  function handleEnter() {
    if (!name) {
      return;
    }
    addAthlete({ name, club });
    name = '';
  }
</script>

<form class="my-2 card variant-soft-surface shadow-md" on:submit|preventDefault={handleEnter}>
  <header class="card-header font-medium text-xl">Aggiungi judoka</header>

  <section class="p-4">
    <label class="label">
      <span>Nome judoka</span>
      <input class="input" placeholder="Nome" type="text" bind:value={name} />
    </label>
    <label class="label my-2">
      <span>Club</span>
      <select class="select" bind:value={club}>
        <option disabled value="">Seleziona club</option>
        {#each clubs as clubOption (clubOption)}
          <option value={clubOption}>{clubOption}</option>
        {/each}
      </select>
    </label>
  </section>

  <footer class="card-footer flex flex-row-reverse">
    <button class="btn variant-filled-primary" disabled={!name} type="submit">Aggiungi</button>
  </footer>
</form>
