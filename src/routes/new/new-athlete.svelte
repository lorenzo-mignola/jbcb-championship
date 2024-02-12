<script lang="ts" strictEvents>
  import { addAthlete } from '../../lib/store/$athletes';
  import { clubs } from '../../lib/store/$settings';

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

<form class="card variant-soft-surface my-2 shadow-md" on:submit|preventDefault={handleEnter}>
  <header class="card-header text-xl font-medium">Aggiungi judoka</header>

  <section class="p-4">
    <label class="label">
      <span>Nome judoka</span>
      <input class="input" placeholder="Nome" type="text" bind:value={name} />
    </label>
    <label class="label my-2">
      <span>Club</span>
      <select class="select" bind:value={club}>
        <option disabled value="">Seleziona club</option>
        {#each $clubs as clubOption (clubOption)}
          <option value={clubOption}>{clubOption}</option>
        {/each}
      </select>
    </label>
  </section>

  <footer class="card-footer flex flex-row-reverse">
    <button class="variant-filled-primary btn" disabled={!name} type="submit">Aggiungi</button>
  </footer>
</form>
