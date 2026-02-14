<script lang='ts'>
  import { athletesState } from '../../../lib/state/category-edit/athletes-state.svelte';
  import { settingsState } from '../../../lib/state/settings/settings-state.svelte';

  let name = $state('');
  let club = $state('');

  function handleEnter() {
    if (!name) {
      return;
    }
    athletesState.addAthlete({ club, name });
    name = '';
  }
</script>

<form
  class='my-2 card preset-outlined-surface-500 p-4'
  onsubmit={(e) => {
    e.preventDefault();
    handleEnter();
  }}>
  <header class='text-xl font-medium'>Aggiungi judoka</header>

  <section class='p-4'>
    <label class='label'>
      <span>Nome judoka</span>
      <input class='input' placeholder='Nome' type='text' bind:value={name} />
    </label>
    <label class='my-2 label'>
      <span>Club</span>
      <select class='select' bind:value={club}>
        <option disabled value="">Seleziona club</option>
        {#each settingsState.clubs as clubOption (clubOption)}
          <option value={clubOption}>{clubOption}</option>
        {/each}
      </select>
    </label>
  </section>

  <footer class='flex flex-row-reverse'>
    <button class='btn preset-filled-primary-500' disabled={!name} type='submit'>Aggiungi</button>
  </footer>
</form>
