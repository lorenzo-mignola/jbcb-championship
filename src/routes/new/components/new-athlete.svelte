<script lang='ts'>
  import { athletesState } from '../../../lib/state/athletes-state.svelte';
  import { settingsState } from '../../../lib/state/settings-state.svelte';

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
  class='card preset-outlined-surface-500 my-2 p-4'
  onsubmit={(e) => {
    e.preventDefault();
    handleEnter();
  }}>
  <header class='card-header text-xl font-medium'>Aggiungi judoka</header>

  <section class='p-4'>
    <label class='label'>
      <span>Nome judoka</span>
      <input class='input' placeholder='Nome' type='text' bind:value={name} />
    </label>
    <label class='label my-2'>
      <span>Club</span>
      <select class='select' bind:value={club}>
        <option disabled value="">Seleziona club</option>
        {#each settingsState.clubs as clubOption (clubOption)}
          <option value={clubOption}>{clubOption}</option>
        {/each}
      </select>
    </label>
  </section>

  <footer class='card-footer flex flex-row-reverse'>
    <button class='preset-filled-primary-500 btn' disabled={!name} type='submit'>Aggiungi</button>
  </footer>
</form>
