<script lang="ts">
  import { getSettings } from '../../lib/db/methods';
  import { addAthlete } from './$athletes';

  const clubs = getSettings()?.clubs || [];

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

<form on:submit|preventDefault={handleEnter} class="my-2 card variant-soft-surface shadow-md">
  <header class="card-header font-medium text-xl">Aggiungi judoka</header>

  <section class="p-4">
    <label class="label">
      <span>Nome judoka</span>
      <input class="input" type="text" bind:value={name} />
    </label>
    <label class="label my-2">
      <span>Club</span>
      <select class="select" bind:value={club}>
        <option disabled value="">Seleziona club</option>
        {#each clubs as clubOption}
          <option value={clubOption}>{clubOption}</option>
        {/each}
      </select>
    </label>
  </section>

  <footer class="card-footer flex flex-row-reverse">
    <button type="submit" class="btn variant-filled-primary" disabled={!name}>Aggiungi</button>
  </footer>
</form>
