<script lang="ts">
  export let type: 'white' | 'blue';
</script>

<div class:judoka-white-card={type === 'white'} class:judoka-blue-card={type === 'blue'}>
  <div class="flex justify-between">
    <span>Nome</span>
    <span>0</span>
  </div>
  <hr class="divider" />
  <div>
    <button type="button" class="btn btn-lg variant-ringed">✋ Ippon</button>
    <button type="button" class="btn btn-lg variant-ringed">🫳 Waza-ari</button>
    <button type="button" class="btn btn-lg variant-ringed"
      ><span class="rotate-180">🤚</span> Osaekomi</button
    >
    <button type="button" class="btn btn-lg variant-ringed">👉 Shido</button>
  </div>
</div>
