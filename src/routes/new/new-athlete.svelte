<script lang="ts">
  import { addAthlete } from './athletes';

  let name = '';
  function handleEnter() {
    if (!name) {
      return;
    }
    addAthlete(name);
    name = '';
  }
</script>

<form on:submit|preventDefault={handleEnter} class="my-2">
  <div class="input-group input-group-divider grid-cols-[1fr_auto]">
    <label class="label">
      <input class="input" type="text" bind:value={name} placeholder="Nome judoka" />
    </label>
    <button class="variant-filled-primary" disabled={!name}>Aggiungi</button>
  </div>
</form>
