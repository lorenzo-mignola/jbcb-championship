<script lang="ts">
  import PointButton from './point-button.svelte';

  export let type: 'white' | 'blue';
</script>

<div class:judoka-white-card={type === 'white'} class:judoka-blue-card={type === 'blue'}>
  <div class="flex justify-between">
    <span>Nome</span>
    <span>0</span>
  </div>
  <hr class="divider" />
  <div>
    <PointButton>✋ Ippon</PointButton>
    <PointButton>🫳 Waza-ari</PointButton>
    <PointButton><span class="rotate-180">🤚</span> Osaekomi</PointButton>
    <PointButton>👉 Shido</PointButton>
  </div>
</div>
